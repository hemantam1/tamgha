const Sequelize = require('sequelize');
const MeasurementValue = require('../models/prodMeasureValue.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getMeasurementValueSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { ProductDetails } = require('../models/associations');
const { getMeasurementsSchema } = require('../utils/schema/schemas');

exports.add = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)
    const _b = req.body;
    let payload = {
        measurementValue: _b.measurementValue,
        productDetail_id: _b.productDetail_id
    }
    if (isAr(lang)) {
        payload.measurementTypeAr = _b.measurementType
    } else {
        payload.measurementType = _b.measurementType
    }

    MeasurementValue.create(payload)
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

    if (!_b.measurementID) {
        res.status(400).json({ status: false, message: "measurementID does not exists" });
        next('Client Error')
    }

    let payload = insertingData(_b, _b.measurementID);

    MeasurementValue.update(payload,
        {
            where: {
                measurementID: _b.measurementID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No MeasurementValues found!');
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
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.measurementID) {
        res.status(400).json({ status: false, message: "measurementID does not exists" });
        next('Client Error')
    }


    MeasurementValue.destroy(
        {
            where: {
                measurementID: _b.measurementID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No MeasurementValue found!');
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
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body

    if (isAdmin) {
        MeasurementValue.findAll()
            .then(c => {

                if (!c) throw new Error('No MeasurementValue found!');

                // let schema = getMeasurementValueSchema(_b.languageID)

                // let data = Serializer.serializeMany(c, MeasurementValue, schema);
                res.status(200).json({ status: true, data: c });

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
    res.status(400).json({ status: false, message: "Not A USER API" });
    next('Client Error')
};


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)


    if (!req.params.measurementID || !req.params.productDetailId) {
        res.status(400).json({ status: false, message: "No params Name measurementID / productDetailId exists" });
        next('Client Error')
    }
    let opts = {
        where: {
            productDetail_id: req.params.productDetailId
        },
        include: [
            { model: ProductDetails },
        ]
    }
    let measurementID = req.params.measurementID
    if (measurementID) opts.where = { measurementID: measurementID }
    MeasurementValue.findAll(opts)
        .then(c => {
            if (!c) throw new Error('No MeasurementValue found!');
            let schema = getMeasurementsSchema(lang)
            let serializer = new Serializer(MeasurementValue, schema);
            let data = {}
            if (c[0]) {
                data = Serializer.serializeMany(c, MeasurementValue, schema);
            }
            else {
                data = serializer.serialize(c);
            }
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
