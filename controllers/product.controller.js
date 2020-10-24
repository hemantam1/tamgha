const Sequelize = require('sequelize');
const Product = require('../models/product.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getProductSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        prodName: _b.prodName,
        prodNameAr: _b.prodNameAr,
        prodDescription: _b.prodDescription,
        prodDescriptionAr: _b.prodDescriptionAr,
        priceCurrencyAr: _b.priceCurrencyAr,
        price: _b.price,
        isAvailable: _b.isAvailable,
        usr_id: _b.usr_id,
        subCat_id: _b.subCat_id
    }

    Product.create(payload)
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

    if (!_b.prodID) {
        res.status(400).json({ status: false, message: "prodID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.prodID);

    Product.update(payload,
        {
            where: {
                prodID: _b.prodID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Products found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.prodID) {
        res.status(400).json({ status: false, message: "prodID does not exists" });
        return
    }


    Product.destroy(
        {
            where: {
                prodID: _b.prodID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Product found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    Product.findAll()
        .then(c => {

            if (!c) throw new Error('No Product found!');

            // let schema = getProductSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Product, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Product.findOne({
        where: {
            prodID: req.params.prodID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Product found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
