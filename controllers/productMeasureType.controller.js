const Sequelize = require('sequelize');
const ProductMeasureType = require('../models/prodMeasureType.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getProductMeasureTypeSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        value: _b.value,
        valueAr: _b.valueAr,
        prod_id: _b.prod_id
    }

    ProductMeasureType.create(payload)
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

    if (!_b.msrID) {
        res.status(400).json({ status: false, message: "msrID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.msrID);

    ProductMeasureType.update(payload,
        {
            where: {
                msrID: _b.msrID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No MeasureTypes found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.msrID) {
        res.status(400).json({ status: false, message: "msrID does not exists" });
        return
    }


    ProductMeasureType.destroy(
        {
            where: {
                msrID: _b.msrID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No ProductMeasureType found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    ProductMeasureType.findAll()
        .then(c => {

            if (!c) throw new Error('No ProductMeasureType found!');

            // let schema = getProductMeasureTypeSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, ProductMeasureType, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    ProductMeasureType.findOne({
        where: {
            msrID: req.params.msrID
        }
    })
        .then(c => {
            if (!c) throw new Error('No ProductMeasureType found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
