const Sequelize = require('sequelize');
const Media = require('../models/media.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getMediaSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getMediaSchema } = require('../utils/schema/schemas');
const { Product } = require('../models/associations');

exports.add = (req, res, next) => {
    if (req.user) {
        const { isAdmin, userId } = getUserDetails(req.user)
    }
    const _b = req.body;
    // console.log(req)
    let payload = {
        mediaLink: _b.mediaLink,
        user_id: userId,
        product_id: _b.product_id
    }

    Media.create(payload)
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

    if (!_b.mediaID) {
        res.status(400).json({ status: false, message: "mediaID does not exists" });
        next('Client Error')
    }

    let payload = insertingData(_b, _b.mediaID);
    payload.user_id = userId
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

    if (!_b.mediaID) {
        res.status(400).json({ status: false, message: "mediaID does not exists" });
        next('Client Error')
    }


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

    if (isAdmin) {
        Media.findAll()
            .then(c => {

                if (!c) throw new Error('No Media found!');

                let schema = getMediaSchema(lang)

                let data = Serializer.serializeMany(c, Media, schema);
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

    Media.findAll({
        where: {
            user_id: userId
        },
        include: [
            {
                model: Product

            },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Media found!');

            let schema = getMediaSchema(lang)

            let data = Serializer.serializeMany(c, Media, schema);
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
    if (!req.params.mediaID || !req.params.product_id) {
        res.status(400).json({ status: false, message: "No Params Name mediaID product_id found" });
        next('Client Error')
    }
    let opts = {
        where: {
            mediaID: req.params.mediaID
        }
    }
    let productId = req.params.product_id
    if (productId) {
        opts = {
            where: {
                product_id: productId
            }
        }
    }
    // console.log(opts)
    Media.findOne(opts)
        .then(c => {
            if (!c) throw new Error('No Me_idia found!');
            let schema = getMediaSchema(lang)
            let serializer = new Serializer(Media, schema);
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
