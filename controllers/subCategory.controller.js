const Sequelize = require('sequelize');
const SubCategory = require('../models/subCategory.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getSubCategorySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getSubCategorySchema } = require('../utils/schema/schemas');
const { Category } = require('../models/associations');

exports.add = (req, res) => {
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
                error: err
            });
        });
};

exports.update = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.subCategoryID) {
        res.status(400).json({ status: false, message: "subCategoryID does not exists" });
        return
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
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.subCategoryID) {
        res.status(400).json({ status: false, message: "subCategoryID does not exists" });
        return
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
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
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
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    SubCategory.findOne({
        where: {
            subCategoryID: req.params.subCategoryID
        }
    })
        .then(c => {
            if (!c) throw new Error('No SubCategory found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
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