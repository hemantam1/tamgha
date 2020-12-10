const Sequelize = require('sequelize');
const Comment = require('../models/comment.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
const { getCommentSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { Product } = require('../models/associations');

exports.add = (req, res, next) => {
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
                error: err, message: err.message
            });
            next(err.message);
        });
};

exports.update = (req, res, next) => {
    const _b = req.body;

    if (!_b.commentID) {
        res.status(400).json({ status: false, message: "commentID does not exists" });
        next('Client Error')
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
            res.status(400).json({
                status: false,
                error: err, message: err.message
            });
            next(err.message);
        });
};


exports.delete = (req, res, next) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.commentID) {
        res.status(400).json({ status: false, message: "commentID does not exists" });
        next('Client Error')
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
        Comment.findAll({
            include: [
                { model: Product },
            ]
        })
            .then(c => {

                if (!c) throw new Error('No Comment found!');

                let schema = getCommentSchema(lang)

                let data = Serializer.serializeMany(c, Comment, schema);
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
    }
    Comment.findAll({
        where: {
            user_id: userId
        },
        include: [
            { model: Product },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Comment found!');

            let schema = getCommentSchema(lang)

            let data = Serializer.serializeMany(c, Comment, schema);
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

    // res.status(401).json({ status: false, message: "Not Authorised" });

};


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (!req.params.commentID || !req.params.product_id) {
        res.status(400).json({ status: false, message: "No Params Name (commentID/product_id) Found  " });
        next('Client Error')
    }
    let opts = {
        where: {
            commentID: req.params.commentID
        },
        include: [
            { model: Product },
        ]
    }
    let productId = req.params.product_id
    if (productId) {
        opts = {
            where: {
                product_id: productId
            },
            include: [
                { model: Product },
            ]
        }
    }
    // console.log(opts)
    Comment.findAll(opts)
        .then(c => {
            if (!c) throw new Error('No Comment found!');

            let schema = getCommentSchema(lang)
            let serializer = new Serializer(Comment, schema);
            let data = {}
            if (!c[0]) {
                data = serializer.serialize(c);
            } else {
                data = Serializer.serializeMany(c, Comment, schema);
            }
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

function getData(_b, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)
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