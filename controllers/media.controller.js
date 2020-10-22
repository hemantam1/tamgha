const Sequelize = require('sequelize');
const Media = require('../models/media.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
const { getMediaSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        MediaName: _b.MediaName,
        MediaUpgradePrice: _b.MediaUpgradePrice,
        MediaPriceCurrency: _b.MediaPriceCurrency,
        hotID: _b.hotID
    }

    if (isAr(_b.languageID)) {
        payload = {
            MediaNameAr: _b.MediaName,
            MediaUpgradePrice: _b.MediaUpgradePrice,
            MediaPriceCurrencyAr: _b.MediaPriceCurrency,
            hotID: _b.hotID
        }
    }
    if (req.isAdmin) {
        payload = {
            MediaName: _b.MediaName,
            MediaNameAr: _b.MediaNameAr,
            MediaUpgradePrice: _b.MediaUpgradePrice,
            MediaPriceCurrency: _b.MediaPriceCurrency,
            MediaPriceCurrencyAr: _b.MediaPriceCurrencyAr,
            hotID: _b.hotID
        }
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

    if (!_b.actID) {
        res.status(400).json({ status: false, message: "actID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.actID);

    Media.update(payload,
        {
            where: {
                actID: _b.actID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Activities found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.actID) {
        res.status(400).json({ status: false, message: "actID does not exists" });
        return
    }


    Media.destroy(
        {
            where: {
                actID: _b.actID
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

            let schema = getMediaSchema(_b.languageID)

            let data = Serializer.serializeMany(c, Media, schema);
            res.status(200).json({ status: true, data });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Media.findOne({
        where: {
            actID: req.params.actID
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
