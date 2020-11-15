const Sequelize = require('sequelize');
const Comment = require('../models/comment.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;

    let payload = getData(_b, req.user)

    Comment.create(payload)
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

    if (!_b.commentID) {
        res.status(400).json({ status: false, message: "commentID does not exists" });
        return
    }

    let payload = getData(_b, req.user)

    Comment.update(payload,
        {
            where: {
                commentID: _b.commentID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Comments found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.commentID) {
        res.status(400).json({ status: false, message: "commentID does not exists" });
        return
    }


    let opts = {}
    if (!isAdmin) {
        opts = {
            where: {
                commentID: _b.commentID,
                user_id: userId
            }
        }
    }
    else {
        opts = {
            where: {
                commentID: _b.commentID,
            }
        }
    }
    Comment.destroy(opts)
        .then(c => {
            if (!c) throw new Error('No Comment found!');
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

    if (isAdmin) {
        Comment.findAll()
            .then(c => {

                if (!c) throw new Error('No Comment found!');

                // let schema = getActivitySchema(_b.languageID)

                // let data = Serializer.serializeMany(c, Comment, schema);
                res.status(200).json({ status: true, data: c });

            })
            .catch(err => {
                console.error(err);
                res.status(400).json({ status: false });
            });
    }
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    Comment.findOne({
        where: {
            product_id: req.params.product_id
        }
    })
        .then(c => {
            if (!c) throw new Error('No Comment found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

function getData(body, user) {
    const lang = body.lCode
    const { isAdmin, userId } = getUserDetails(user)
    let payload = {}
    if (isAdmin) {
        payload = {
            comment: _b.comment,
            commentAr: _b.commentAr,
            user_id: userId,
            product_id: _b.product_id
        }
    } else if (isAr(lang)) {
        payload = {
            commentAr: _b.comment,
            user_id: userId,
            product_id: _b.product_id
        }
    } else {
        payload = {
            comment: _b.comment,
            user_id: userId,
            product_id: _b.product_id
        }
    }
    return payload
}