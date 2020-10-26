const Sequelize = require('sequelize');
const MeasureValue = require('../models/prodMeasureValue.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getMeasureValueSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        measureType: _b.measureType,
        measureTypeAr: _b.measureTypeAr,
        measureValue: _b.measureValue,
        prdetail_id: _b.prdetail_id
    }

    MeasureValue.create(payload)
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

    if (!_b.msvID) {
        res.status(400).json({ status: false, message: "msvID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.msvID);

    MeasureValue.update(payload,
        {
            where: {
                msvID: _b.msvID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No MeasureValues found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.msvID) {
        res.status(400).json({ status: false, message: "msvID does not exists" });
        return
    }


    MeasureValue.destroy(
        {
            where: {
                msvID: _b.msvID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No MeasureValue found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    MeasureValue.findAll()
        .then(c => {

            if (!c) throw new Error('No MeasureValue found!');

            // let schema = getMeasureValueSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, MeasureValue, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    MeasureValue.findOne({
        where: {
            msvID: req.params.msvID
        }
    })
        .then(c => {
            if (!c) throw new Error('No MeasureValue found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
