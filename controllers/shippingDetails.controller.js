const Sequelize = require('sequelize');
const ShippingDetails = require('../models/shippingDetails.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getShippingDetailsSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getShipDetailSchema } = require('../utils/schema/schemas');

exports.add = (req, res, next) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;
    if (!isAdmin) {
        res.status(400).json({
            status: false, message: "Not a Admin"
        });
        next('Client Error');
        return
    }
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
                message: err.message
            });
            next(err.message);
        });

};

exports.update = (req, res, next) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.shipID) {
        res.status(400).json({
            status: false, message: "shipID does not exists"
        });
        next('Client Error')
        return
    }
    if (!isAdmin) {
        res.status(400).json({
            status: false, message: "Not a Admin"
        });
        next('Client Error')
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
            res.status(200).json({ status: true, update: c });
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
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;
    if (!isAdmin) {
        res.status(400).json({
            status: false, message: "Not a Admin"
        });
        next('Client Error')
        return
    }
    if (!_b.shipID) {
        res.status(400).json({
            status: false, message: "shipID does not exists"
        });
        next('Client Error')
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
            res.status(200).json({ status: true, delete: c });
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
    const _b = req.body

    ShippingDetails.findAll()
        .then(c => {

            if (!c) throw new Error('No ShippingDetails found!');

            let schema = getShipDetailSchema(lang)

            let data = Serializer.serializeMany(c, ShippingDetails, schema);
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

    if (!req.params.shipID) {
        res.status(400).json({
            status: false, message: "No Param Name shipID found"
        });
        next('Client Error')
        return
    }

    ShippingDetails.findOne({
        where: {
            shipID: req.params.shipID
        }
    })
        .then(c => {
            if (!c) throw new Error('No ShippingDetails found!');
            let schema = getShipDetailSchema(lang)
            let serializer = new Serializer(ShippingDetails, schema);
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
