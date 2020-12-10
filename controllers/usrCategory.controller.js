const Sequelize = require('sequelize');
const UsrCategory = require('../models/userCategory.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getCategorySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getUserCategorySchema, getSubCategorySchema } = require('../utils/schema/schemas');
const UserCategory = require('../models/userCategory.model');

exports.add = (req, res, next) => {
    const _b = req.body;

    let payload = getData(_b, req.user)
    UsrCategory.create(payload)
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

    if (!_b.userCategoryID) {
        res.status(400).json({
            status: false, message: "userCategoryID does not exists"
        });
        next('Client Error')
    }

    let payload = getData(_b, req.user)

    UsrCategory.update(payload,
        {
            where: {
                userCategoryID: _b.userCategoryID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Categories found!');
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

    if (!_b.userCategoryID) {
        res.status(400).json({
            status: false, message: "userCategoryID does not exists"
        });
        next('Client Error')
    }


    UsrCategory.destroy(
        {
            where: {
                userCategoryID: _b.userCategoryID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No UsrCategory found!');
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
    if (req.params.self) {
        UsrCategory.findAll({
            where: {
                user_id: userId
            }
        })
            .then(c => {

                if (!c) throw new Error('No UsrCategory found!');

                let schema = getUserCategorySchema(lang)

                let data = Serializer.serializeMany(c, UsrCategory, schema);
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
    UsrCategory.findAll()
        .then(c => {

            if (!c) throw new Error('No UsrCategory found!');

            let schema = getUserCategorySchema(lang)

            let data = Serializer.serializeMany(c, UsrCategory, schema);
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


    if (!req.params.userCategoryID) {
        res.status(400).json({
            status: false, message: "No param name userCategoryID exists"
        });
        next('Client Error')
    }
    UsrCategory.findOne({
        where: {
            userCategoryID: req.params.userCategoryID
        }
    })
        .then(c => {
            if (!c) throw new Error('No UsrCategory found!');
            let schema = getUserCategorySchema(lang)
            let serializer = new Serializer(UsrCategory, schema);
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

function getData(_b, user) {
    const { isAdmin, userId } = getUserDetails(user)
    let payload = {}
    if (isAdmin) {
        payload = {
            userCategory: _b.userCategory,
            userCategoryAr: _b.userCategoryAr,
        }
    } else if (isAr(lang)) {
        payload.userCategoryAr = _b.userCategory
    } else {
        payload.userCategory = _b.userCategory
    }
    return payload
}