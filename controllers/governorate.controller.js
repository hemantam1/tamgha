const Sequelize = require('sequelize');
const State = require('../models/state.model');
const config = require('../config');
const { getUserDetails } = require('../utils/helperFunc');
const { Country } = require('../models/associations');

exports.add = (req, res) => {
    const _b = req.body;

    let payload = getData(_b, req.user)

    State.create(payload)
        .then(r => {
            res.status(200).json({ status: true, result: r });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                error: err
            });
        });
};

exports.update = (req, res) => {
    const _b = req.body;

    if (!_b.stateID) {
        res.status(400).json({ status: false, message: "stateID does not exists" });
        return
    }
    let payload = getData(_b, req.user)


    State.update(payload,
        {
            where: {
                stateID: _b.stateID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No State found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.stateID) {
        res.status(400).json({ status: false, message: "stateID does not exists" });
        return
    }

    State.destroy(
        {
            where: {
                stateID: _b.stateID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No State found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    State.findAll({
        include: [
            { model: Country },
        ]
    })
        .then(c => {
            if (!c) throw new Error('No State found!');
            let schema = getStateSchema(lang)

            let data = Serializer.serializeMany(c, State, schema);

            res.status(200).json({ status: true, data });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    State.findOne({
        where: {
            stateID: req.params.stateID
        }
    })
        .then(c => {
            if (!c) throw new Error('No State found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

function getData(body, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)
    let payload = {
        country_id: _b.country_id
    }
    if (isAdmin) {
        payload = {
            state: _b.state,
            stateAr: _b.stateAr,
        }
    } else if (isAr(lang)) {
        payload.stateAr = body.state
    } else {
        payload.state = body.state
    }
    return payload
}
