const Sequelize = require('sequelize');
const City = require('../models/city.model');
const config = require('../config');
const { getUserDetails } = require('../utils/helperFunc');
const { isAr } = require('../utils/verify');
const { getCitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;

    let payload = getData(_b, req.user)
    City.create(payload)
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

    if (!_b.cityID) {
        res.status(400).json({ status: false, message: "cityID does not exists" });
        return
    }

    let payload = getData(_b, req.user)

    City.update(payload,
        {
            where: {
                cityID: _b.cityID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No City found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.cityID) {
        res.status(400).json({ status: false, message: "cityID does not exists" });
        return
    }

    City.destroy(
        {
            where: {
                cityID: _b.cityID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No City found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    City.findAll()
        .then(c => {
            if (!c) throw new Error('No City found!');
            let schema = getCitySchema(lang)

            let data = Serializer.serializeMany(c, City, schema);

            res.status(200).json({ status: true, data });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    City.findOne({
        where: {
            cityID: req.params.cityID
        }
    })
        .then(c => {
            if (!c) throw new Error('No City found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
function getData(body, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)
    let payload = {}
    if (isAdmin) {
        payload = {
            city: _b.city,
            cityAr: _b.cityAr,
            state_id: _b.state_id
        }
    } else if (isAr(lang)) {
        payload.cityAr = body.city
        payload.state_id = body.state_id
    } else {
        payload.city = body.city
        payload.state_id = body.state_id
    }
    return payload
}
