const Sequelize = require('sequelize');
const Country = require('../models/country.model');
const config = require('../config');
const { getUserDetails } = require('../utils/helperFunc');
const Serializer = require('sequelize-to-json');
const { getCountrySchema } = require('../utils/schema/schemas');
const { isAr } = require('../utils/verify');

exports.add = (req, res, next) => {
    const _b = req.body;
    let payload = getData(_b, req.user)

    Country.create(payload)
        .then(r => {
            res.status(200).json({ status: true, result: r });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });
};

exports.update = (req, res, next) => {
    const _b = req.body;

    if (!_b.countryID) {
        res.status(400).json({ status: false, message: "countryID does not exists" });
        next('Client Error')
    }
    let payload = getData(_b, req.user)

    Country.update(payload,
        {
            where: {
                countryID: _b.countryID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No country found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });
};


exports.delete = (req, res, next) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.countryID) {
        res.status(400).json({ status: false, message: "countryID does not exists" });
        next('Client Error')
    }

    Country.destroy(
        {
            where: {
                countryID: _b.countryID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No country found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });
};

exports.getAll = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)


    Country.findAll()
        .then(c => {
            if (!c) throw new Error('No country found!');
            let schema = getCountrySchema(lang)

            let data = Serializer.serializeMany(c, Country, schema);

            res.status(200).json({ status: true, data });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });
};


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (!req.params.countryID) {
        res.status(400).json({ status: false, message: "No Param Name countryID found" });
        next('Client Error')
    }
    Country.findOne({
        where: {
            countryID: req.params.countryID
        }
    })
        .then(c => {
            if (!c) throw new Error('No country found!');

            let schema = getCountrySchema(lang)
            let serializer = new Serializer(Country, schema);
            let data = serializer.serialize(c);

            res.status(200).json({ status: true, data });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });
};

function getData(body, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)
    let payload = {}
    if (isAdmin) {
        payload = {
            country: _b.country,
            countryAr: _b.countryAr,
        }
    } else if (isAr(lang)) {
        payload.countryAr = body.country
    } else {
        payload.country = body.country
    }
    return payload
}