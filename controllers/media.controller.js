const Sequelize = require('sequelize');
const Media = require('../models/media.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getMediaSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        medType: _b.medType,
        medValue: _b.medValue,
        prod_id: _b.prod_id
    }

    Media.create(payload)
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

    if (!_b.medID) {
        res.status(400).json({ status: false, message: "medID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.medID);

    Media.update(payload,
        {
            where: {
                medID: _b.medID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Media found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.medID) {
        res.status(400).json({ status: false, message: "medID does not exists" });
        return
    }


    Media.destroy(
        {
            where: {
                medID: _b.medID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Media found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    Media.findAll()
        .then(c => {

            if (!c) throw new Error('No Media found!');

            // let schema = getMediaSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Media, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Media.findOne({
        where: {
            medID: req.params.medID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Media found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
