const Sequelize = require('sequelize');
const Followers = require('../models/followers.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getFollowerSchema } = require('../utils/schema/schemas');
const { User } = require('../models/associations');

exports.add = (req, res, next) => {
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
                message: err.message
            });
            next(err.message);
        });
};


exports.delete = (req, res, next) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.followerID) {
        res.status(400).json({ status: false, message: "followerID does not exists" });
        next('Client Error')
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
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });
};

exports.getAll = (req, res, next) => {
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
                res.status(400).json({
                    status: false,
                    message: err.message
                });
                next(err.message);
            });
    }
    Followers.findAll({
        where: {
            user_id: userId
        },
        include: [
            { model: User, as: 'followerUser' },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Followers found!');

            let schema = getFollowerSchema(lang)

            let data = Serializer.serializeMany(c, Followers, schema);
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
    if (!req.params.followerID || !req.params.userId) {
        res.status(400).json({ status: false, message: "No Params Name followerID / userId found  " });
        next('Client Error')
    }

    let followerUserId = req.params.userId
    let opts = {
        where: {
            followerID: req.params.followerID
        },
        include: [
            { model: User },
            { model: User, as: 'followerUser' },
        ]
    }
    if (followerUserId) {
        opts = {
            where: {
                follower_user_id: followerUserId
            },
            include: [
                { model: User },
                { model: User, as: 'followerUser' },

            ]
        }
    }
    Followers.findAll(opts)
        .then(c => {
            if (!c) throw new Error('No Followers found!');

            let schema = getFollowerSchema(lang)

            let data = Serializer.serializeMany(c, Followers, schema);
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
