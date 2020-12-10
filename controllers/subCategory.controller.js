const Sequelize = require('sequelize');
const SubCategory = require('../models/subCategory.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getSubCategorySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getSubCategorySchema } = require('../utils/schema/schemas');
const { Category } = require('../models/associations');

exports.add = (req, res, next) => {
    const _b = req.body;

    let payload = getData(_b, req.user)

    SubCategory.create(payload)
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

    if (!_b.subCategoryID) {
        res.status(400).json({ status: false, message: "subCategoryID does not exists" });
        next('Client Error')
    }

    let payload = getData(_b, req.user);

    SubCategory.update(payload,
        {
            where: {
                subCategoryID: _b.subCategoryID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No SubCategory found!');
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

    if (!_b.subCategoryID) {
        res.status(400).json({ status: false, message: "subCategoryID does not exists" });
        next('Client Error')
    }


    SubCategory.destroy(
        {
            where: {
                subCategoryID: _b.subCategoryID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No SubCategory found!');
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

    SubCategory.findAll({
        include: [
            { model: Category },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No SubCategory found!');

            let schema = getSubCategorySchema(lang)

            let data = Serializer.serializeMany(c, SubCategory, schema);
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


    if (!req.params.subCategoryID) {
        res.status(400).json({ status: false, message: "No param Name subCategoryID exists" });
        next('Client Error')
    }

    SubCategory.findOne({
        where: {
            subCategoryID: req.params.subCategoryID
        }
    })
        .then(c => {
            if (!c) throw new Error('No SubCategory found!');
            let schema = getSubCategorySchema(lang)
            let serializer = new Serializer(SubCategory, schema);
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
    const { isAdmin, userId, lang } = getUserDetails(user)
    let payload = {
        category_id: _b.category_id,
    }
    if (isAdmin) {
        payload = {
            subCategory: _b.subCategory,
            subCategoryAr: _b.subCategoryAr,
            category_id: _b.category_id
        }
    } else if (isAr(lang)) {
        payload.subCategoryAr = _b.subCategory
    } else {
        payload.subCategory = _b.subCategory
    }
    return payload
}