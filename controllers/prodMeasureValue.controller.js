const Sequelize = require('sequelize');
const MeasurementValue = require('../models/prodMeasureValue.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getMeasurementValueSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { ProductDetails } = require('../models/associations');

exports.add = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
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
                error: err
            });
        });
};

exports.update = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.measurementID) {
        res.status(400).json({ status: false, message: "measurementID does not exists" });
        return
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
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.measurementID) {
        res.status(400).json({ status: false, message: "measurementID does not exists" });
        return
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
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
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
                res.status(400).json({ status: false });
            });
    }
    res.status(400).json({ status: false, message: "Not A USER API" });

};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    let opts = {
        where: {
            productDetail_id: req.params.productDetail_id
        },
        include: [
            { model: ProductDetails },
        ]
    }
    let measurementID = req.params.measurementID
    if (measurementID) opts.where = { measurementID: measurementID }
    MeasurementValue.findOne(opts)
        .then(c => {
            if (!c) throw new Error('No MeasurementValue found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
