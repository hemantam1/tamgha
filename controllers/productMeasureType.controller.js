const Sequelize = require('sequelize');
const ProductMeasureType = require('../models/prodMeasureType.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getProductMeasureTypeSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getMeasurementTypeSchema } = require('../utils/schema/schemas');
const { Product } = require('../models/associations');
const measureTypeSchema = require('../utils/schema/measureType.schema');

exports.add = (req, res, next) => {
    const _b = req.body;

    let payload = getData(_b, req.user)

    ProductMeasureType.create(payload)
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

    if (!_b.typeID) {
        res.status(400).json({ status: false, message: "typeID does not exists" });
        next('Client Error')
        return
    }
    let payload = getData(_b, req.user)

    ProductMeasureType.update(payload,
        {
            where: {
                typeID: _b.typeID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No MeasurementTypes found!');
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
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.typeID) {
        res.status(400).json({ status: false, message: "typeID does not exists" });
        next('Client Error')
        return
    }


    ProductMeasureType.destroy(
        {
            where: {
                typeID: _b.typeID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No ProductMeasurementType found!');
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
    const _b = req.body
    const { isAdmin, userId, lang } = getUserDetails(req.user)
    if (isAdmin) {


        ProductMeasureType.findAll({
            include: [
                { model: Product },
            ]
        })
            .then(c => {

                if (!c) throw new Error('No ProductMeasurementType found!');

                let schema = getMeasurementTypeSchema(lang)

                let data = Serializer.serializeMany(c, ProductMeasureType, schema);
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
    }
    res.status(400).json({ status: false, message: "Not a user API" });
};


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)
    if (!req.params.typeID && !req.params.productId) {
        res.status(400).json({ status: false, message: "No params name typeID / productId exists" });
        next('Client Error')
        return
    }
    let opts = {
        where: {
            typeID: req.params.typeID
        }
    }
    let productId = req.params.productId
    if (productId) {
        opts = {
            where: {
                product_id: productId
            }
        }
    }
    ProductMeasureType.findAll(opts)
        .then(c => {
            if (!c) throw new Error('No ProductMeasurementType found!');
            let schema = getMeasurementTypeSchema(lang)

            let data = Serializer.serializeMany(c, ProductMeasureType, schema);
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
function getData(_b, user) {

    const { isAdmin, userId, lang } = getUserDetails(user)
    let payload = {
        type: _b.type,
        product_id: _b.product_id
    }
    if (isAdmin) {
        payload = {
            type: _b.type,
            typeAr: _b.typeAr,
            product_id: _b.product_id
        }
    }
    if (isAr(lang)) {
        payload.typeAr = _b.type
    } else {
        payload.type = _b.type
    }
    return payload
}