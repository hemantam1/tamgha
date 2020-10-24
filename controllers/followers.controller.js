const Sequelize = require('sequelize');
const Followers = require('../models/followers.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        usr_id: _b.usr_id,
        fol_usrID: _b.fol_usrID
    }
    Followers.create(payload)
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

    if (!_b.folID) {
        res.status(400).json({ status: false, message: "folID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.folID);

    Followers.update(payload,
        {
            where: {
                folID: _b.folID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Followers found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.folID) {
        res.status(400).json({ status: false, message: "folID does not exists" });
        return
    }


    Followers.destroy(
        {
            where: {
                folID: _b.folID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Followers found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    Followers.findAll()
        .then(c => {

            if (!c) throw new Error('No Followers found!');

            // let schema = getActivitySchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Followers, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Followers.findOne({
        where: {
            folID: req.params.folID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Followers found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
