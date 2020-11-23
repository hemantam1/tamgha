const Sequelize = require('sequelize');
const Country = require('../models/country.model');
const config = require('../config');
const { getUserDetails } = require('../utils/helperFunc');
const Serializer = require('sequelize-to-json');
const { getCountrySchema } = require('../utils/schema/schemas');
const { isAr } = require('../utils/verify');

exports.add = (req, res) => {
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
                error: err
            });
        });
};

exports.update = (req, res) => {
    const _b = req.body;

    if (!_b.countryID) {
        res.status(400).json({ status: false, message: "countryID does not exists" });
        return
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
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.countryID) {
        res.status(400).json({ status: false, message: "countryID does not exists" });
        return
    }
    Server

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
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
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
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

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
            res.status(400).json({ status: false });
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