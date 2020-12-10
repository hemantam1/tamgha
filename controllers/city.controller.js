const Sequelize = require('sequelize');
const City = require('../models/city.model');
const config = require('../config');
const { getUserDetails } = require('../utils/helperFunc');
const { isAr } = require('../utils/verify');
const { getCitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const State = require('../models/state.model');
const Country = require('../models/country.model');

exports.add = (req, res, next) => {
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
                error: err, message: err.message
            });
            next(err.message);
        });
};

exports.update = (req, res, next) => {
    const _b = req.body;

    if (!_b.cityID) {
        res.status(400).json({ status: false, message: "cityID does not exists" });
        next('Client Error')
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
            res.status(200).json({ status: true, update: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                error: err, message: err.message
            });
            next(err.message);
        });
};


exports.delete = (req, res, next) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.cityID) {
        res.status(400).json({ status: false, message: "cityID does not exists" });
        next('Client Error')
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
            res.status(200).json({ status: true, delete: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                error: err, message: err.message
            });
            next(err.message);
        });
};

exports.getAll = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    City.findAll(
        {
            include: [
                {
                    model: State,
                    include: [
                        { model: Country }
                    ]
                },
            ]
        }
    )
        .then(c => {
            if (!c) throw new Error('No City found!');
            let schema = getCitySchema(lang)

            let data = Serializer.serializeMany(c, City, schema);

            res.status(200).json({ status: true, data });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                error: err, message: err.message
            });
            next(err.message);
        });
};


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (!req.params.cityID) {
        res.status(400).json({ status: false, message: "No Param Name cityID found" });
        next('Client Error')
        return

    }
    City.findOne({
        where: {
            cityID: req.params.cityID
        }, include: [
            {
                model: State,
                include: [
                    { model: Country }
                ]
            },
        ]
    })
        .then(c => {
            if (!c) throw new Error('No City found!');

            let schema = getCitySchema(lang)
            let serializer = new Serializer(City, schema);
            let data = serializer.serialize(c);
            res.status(200).json({ status: true, data });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                error: err, message: err.message
            });
            next(err.message);
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
