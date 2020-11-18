const Sequelize = require('sequelize');
const Followers = require('../models/followers.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getFollowerSchema } = require('../utils/schema/schemas');
const { User } = require('../models/associations');

exports.add = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)
    let payload = {
        user_id: _b.user_id,
        follower_user_id: userId
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


exports.delete = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.followerID) {
        res.status(400).json({ status: false, message: "followerID does not exists" });
        return
    }


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
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (isAdmin) {
        Followers.findAll()
            .then(c => {

                if (!c) throw new Error('No Followers found!');

                // let schema = getActivitySchema(_b.languageID)

                // let data = Serializer.serializeMany(c, Followers, schema);
                res.status(200).json({ status: true, data: c });
                return
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({ status: false });
            });
    }
    Followers.findAll({
        where: {
            user_id: userId
        },
        include: [
            { model: User },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Followers found!');

            let schema = getFollowerSchema(lang)

            let data = Serializer.serializeMany(c, Followers, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    let followerUserId = req.params.followerUserId
    let opts = {
        where: {
            followerID: req.params.followerID
        }
    }
    if (followerUserId) {
        opts = {
            where: {
                follower_user_id: req.params.follower_user_id
            },
            include: [
                { model: User },
            ]
        }
    }
    Followers.findAll(opts)
        .then(c => {
            if (!c) throw new Error('No Followers found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
