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
        user_id: _b.user_id,
        follower_user_id: _b.follower_user_id
    }
    const { isAdmin, userId } = getUserDetails(req.user)

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

    if (!_b.followerID) {
        res.status(400).json({ status: false, message: "followerID does not exists" });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)

    let payload = insertingData(_b, _b.followerID);

    Followers.update(payload,
        {
            where: {
                followerID: _b.followerID
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

    if (!_b.followerID) {
        res.status(400).json({ status: false, message: "followerID does not exists" });
        return
    }

    const { isAdmin, userId } = getUserDetails(req.user)

    Followers.destroy(
        {
            where: {
                followerID: _b.followerID
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
    const { isAdmin, userId } = getUserDetails(req.user)

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
    const { isAdmin, userId } = getUserDetails(req.user)

    Followers.findOne({
        where: {
            followerID: req.params.followerID
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
