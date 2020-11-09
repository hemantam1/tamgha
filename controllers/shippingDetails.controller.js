const Sequelize = require('sequelize');
const ShippingDetails = require('../models/shippingDetails.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getShippingDetailsSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        weight: _b.weight,
        currency: _b.currency,
        currencyAr: _b.currencyAr,
        price: _b.price,
    }

    ShippingDetails.create(payload)
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

    if (!_b.shipID) {
        res.status(400).json({
            status: false, message: "shipID does not exists"
        });
        return
    }

    let payload = insertingData(_b, _b.shipID);

    ShippingDetails.update(payload,
        {
            where: {
                shipID: _b.shipID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Details found!');
            res.status(200).json({ status: true, ShippingDetails: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.shipID) {
        res.status(400).json({
            status: false, message: "shipID does not exists"
        });
        return
    }


    ShippingDetails.destroy(
        {
            where: {
                shipID: _b.shipID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No ShippingDetails found!');
            res.status(200).json({ status: true, ShippingDetails: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    ShippingDetails.findAll()
        .then(c => {

            if (!c) throw new Error('No ShippingDetails found!');

            // let schema = getShippingDetailsSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, ShippingDetails, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    ShippingDetails.findOne({
        where: {
            shipID: req.params.shipID
        }
    })
        .then(c => {
            if (!c) throw new Error('No ShippingDetails found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
