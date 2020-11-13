const Sequelize = require('sequelize');
const ProdDetail = require('../models/prodDetails.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        size: _b.size,
        available: _b.available,
        color: _b.color,
        colorAr: _b.colorAr,
        priceCurrency: _b.priceCurrency,
        priceCurrencyAr: _b.priceCurrencyAr,
        totalPrice: _b.totalPrice,
        isFaltDiscount: _b.isFaltDiscount,
        priceExcluding: _b.priceExcluding,
        product_id: _b.product_id
    }
    const { isAdmin, userId } = getUserDetails(req.user)

    ProdDetail.create(payload)
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

    if (!_b.productDetailID) {
        res.status(400).json({ status: false, message: "productDetailID does not exists" });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)

    let payload = insertingData(_b, _b.productDetailID);

    ProdDetail.update(payload,
        {
            where: {
                productDetailID: _b.productDetailID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Activities found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.productDetailID) {
        res.status(400).json({ status: false, message: "productDetailID does not exists" });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)


    ProdDetail.destroy(
        {
            where: {
                productDetailID: _b.productDetailID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No ProdDetail found!');
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

    ProdDetail.findAll()
        .then(c => {

            if (!c) throw new Error('No ProdDetail found!');

            // let schema = getSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, ProdDetail, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    ProdDetail.findOne({
        where: {
            productDetailID: req.params.productDetailID
        }
    })
        .then(c => {
            if (!c) throw new Error('No ProdDetail found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
