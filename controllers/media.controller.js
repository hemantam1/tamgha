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
        mediaType: _b.mediaType,
        mediaLink: _b.mediaLink,
        product_id: _b.product_id
    }
    const { isAdmin, userId } = getUserDetails(req.user)

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

    if (!_b.mediaID) {
        res.status(400).json({ status: false, message: "mediaID does not exists" });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)

    let payload = insertingData(_b, _b.mediaID);

    Media.update(payload,
        {
            where: {
                mediaID: _b.mediaID
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

    if (!_b.mediaID) {
        res.status(400).json({ status: false, message: "mediaID does not exists" });
        return
    }

    const { isAdmin, userId } = getUserDetails(req.user)

    Media.destroy(
        {
            where: {
                mediaID: _b.mediaID
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
    const { isAdmin, userId } = getUserDetails(req.user)

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
    const { isAdmin, userId } = getUserDetails(req.user)

    Media.findOne({
        where: {
            mediaID: req.params.mediaID
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
