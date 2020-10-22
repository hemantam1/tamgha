const Sequelize = require('sequelize');
const Category = require('../models/category.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
const { getCategorySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        CatName: _b.CatName,
        CatNameAr: _b.CatNameAr,
    }

    // if (isAr(_b.languageID)) {
    //     payload = {
    //         CategoryNameAr: _b.CategoryName,
    //         CategoryUpgradePrice: _b.CategoryUpgradePrice,
    //         CategoryPriceCurrencyAr: _b.CategoryPriceCurrency,
    //         hotID: _b.hotID
    //     }
    // }
    // if (req.isAdmin) {
    //     payload = {
    //         CategoryName: _b.CategoryName,
    //         CategoryNameAr: _b.CategoryNameAr,
    //         CategoryUpgradePrice: _b.CategoryUpgradePrice,
    //         CategoryPriceCurrency: _b.CategoryPriceCurrency,
    //         CategoryPriceCurrencyAr: _b.CategoryPriceCurrencyAr,
    //         hotID: _b.hotID
    //     }
    // }
    Category.create(payload)
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

    if (!_b.catID) {
        res.status(400).json({
            status: false, message: "catID does not exists"
        });
        return
    }

    let payload = insertingData(_b, _b.catID);

    Category.update(payload,
        {
            where: {
                catID:
                    _b.catID
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

    if (!_b.catID) {
        res.status(400).json({
            status: false, message: "catID does not exists"
        });
        return
    }


    Category.destroy(
        {
            where: {
                catID: _b.catID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Category found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    Category.findAll()
        .then(c => {

            if (!c) throw new Error('No Category found!');

            // let schema = getCategorySchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Category, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Category.findOne({
        where: {
            catID: req.params.catID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Category found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
