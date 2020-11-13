const Sequelize = require('sequelize');
const UsrCategory = require('../models/userCategory.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getCategorySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        userCategory: _b.userCategory,
        userCategoryAr: _b.userCategoryAr,
    }
    const { isAdmin, userId } = getUserDetails(req.user)

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
    const _b = req.body;

    if (!_b.userCategoryID) {
        res.status(400).json({
            status: false, message: "userCategoryID does not exists"
        });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)

    let payload = insertingData(_b, _b.userCategoryID);

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
    const _b = req.body;

    if (!_b.userCategoryID) {
        res.status(400).json({
            status: false, message: "userCategoryID does not exists"
        });
        return
    }

    const { isAdmin, userId } = getUserDetails(req.user)

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
    const _b = req.body
    const { isAdmin, userId } = getUserDetails(req.user)

    UsrCategory.findAll()
        .then(c => {

            if (!c) throw new Error('No UsrCategory found!');

            // let schema = getCategorySchema(_b.languageID)

            // let data = Serializer.serializeMany(c, UsrCategory, schema);
            res.status(200).json({ status: true, data: c });

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
