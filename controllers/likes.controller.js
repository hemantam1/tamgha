const Sequelize = require('sequelize');
const Likes = require('../models/likes.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
const { getLikesSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        usr_id: _b.usr_id,
        like_usrID: _b.like_usrID
    }

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

    if (!_b.likID) {
        res.status(400).json({ status: false, message: "likID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.likID);

    Likes.update(payload,
        {
            where: {
                likID: _b.likID
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

    if (!_b.likID) {
        res.status(400).json({ status: false, message: "likID does not exists" });
        return
    }


    Likes.destroy(
        {
            where: {
                likID: _b.likID
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
    Likes.findOne({
        where: {
            likID: req.params.likID
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
