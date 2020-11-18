const Sequelize = require('sequelize');
const UsrCategory = require('../models/userCategory.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getCategorySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getUserCategorySchema, getSubCategorySchema } = require('../utils/schema/schemas');

exports.add = (req, res) => {
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
                error: err
            });
        });
};

exports.update = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.userCategoryID) {
        res.status(400).json({
            status: false, message: "userCategoryID does not exists"
        });
        return
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
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.userCategoryID) {
        res.status(400).json({
            status: false, message: "userCategoryID does not exists"
        });
        return
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
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
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
                res.status(400).json({ status: false });
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
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    UsrCategory.findOne({
        where: {
            userCategoryID: req.params.userCategoryID
        }
    })
        .then(c => {
            if (!c) throw new Error('No UsrCategory found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
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