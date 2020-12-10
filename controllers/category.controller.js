const Sequelize = require('sequelize');
const Category = require('../models/category.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getCategorySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getCategorySchema } = require('../utils/schema/schemas');

exports.add = (req, res, next) => {
    const _b = req.body;

    let payload = getData(_b, req.user)

    Category.create(payload)
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

    if (!_b.categoryID) {
        res.status(400).json({
            status: false, message: "categoryID does not exists"
        });
        next('Client Error')
        return
    }
    let payload = getData(_b, req.user)

    Category.update(payload,
        {
            where: {
                categoryID: _b.categoryID
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
                error: err, message: err.message
            });
            next(err.message);
        });
};


exports.delete = (req, res, next) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.categoryID) {
        res.status(400).json({
            status: false, message: "categoryID does not exists"
        });
        next('Client Error')
    }


    Category.destroy(
        {
            where: {
                categoryID: _b.categoryID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Category found!');
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

exports.getAll = (req, res, next) => {
    const _b = req.body
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    Category.findAll()
        .then(c => {

            if (!c) throw new Error('No Category found!');

            let schema = getCategorySchema(lang)

            let data = Serializer.serializeMany(c, Category, schema);
            res.status(200).json({ status: true, data });

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


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)


    if (!req.params.categoryID || !req.params.product_id) {
        res.status(400).json({
            status: false, message: "No params Name categoryID/product_id found"
        });
        next('Client Error')
    }
    // console.log("GET BY")
    if (req.params.product_id) {
        opts = {
            where: {
                product_id: req.params.product_id
            }
        }
    }
    Category.findOne({
        where: {
            categoryID: req.params.categoryID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Category found!');

            let schema = getCategorySchema(lang)
            let serializer = new Serializer(Category, schema);
            let data = serializer.serialize(c);
            res.status(200).json({ status: true, data });
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

function getData(body, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)
    let payload = {}
    if (isAdmin) {
        payload.category = body.category
        payload.categoryAr = body.categoryAr
    } else if (isAr(lang)) {
        payload.categoryAr = body.category
    }
    else {
        payload.category = body.category
    }
    return payload
}