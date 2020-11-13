const Sequelize = require('sequelize');
const Likes = require('../models/likes.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getLikesSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        user_id: _b.user_id,
        product_id: _b.product_id
    }
    const { isAdmin, userId } = getUserDetails(req.user)

    Likes.create(payload)
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

    if (!_b.likeID) {
        res.status(400).json({ status: false, message: "likeID does not exists" });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)

    let payload = insertingData(_b, _b.likeID);

    Likes.update(payload,
        {
            where: {
                likeID: _b.likeID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No LIKES found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.likeID) {
        res.status(400).json({ status: false, message: "likeID does not exists" });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)


    Likes.destroy(
        {
            where: {
                likeID: _b.likeID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Likes found!');
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

    Likes.findAll()
        .then(c => {

            if (!c) throw new Error('No Likes found!');

            // let schema = getLikesSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Likes, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    Likes.findOne({
        where: {
            likeID: req.params.likeID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Likes found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
