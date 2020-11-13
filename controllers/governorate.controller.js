const Sequelize = require('sequelize');
const State = require('../models/governorate.model');
const config = require('../config');

exports.add = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    State.create({
        state: _b.state,
        stateAr: _b.stateAr,
        country_id: _b.country_id
    })
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
    const { isAdmin, userId } = getUserDetails(req.user)
    let payload = {};

    if (!_b.stateID) {
        res.status(400).json({ status: false, message: "stateID does not exists" });
        return
    }

    if (_b.state)
        payload.state = _b.state

    if (_b.stateAr)
        payload.stateAr = _b.stateAr

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
    const { isAdmin, userId } = getUserDetails(req.user)

    State.findAll()
        .then(c => {
            if (!c) throw new Error('No State found!');
            res.status(200).json({ status: true, data: c });
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
