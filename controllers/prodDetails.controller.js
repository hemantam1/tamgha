const Sequelize = require('sequelize');
const ProdDetail = require('../models/prodDetails.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { Product } = require('../models/associations');
const { getProductDetailSchema } = require('../utils/schema/schemas');

exports.add = (req, res) => {
    const _b = req.body;

    let payload = getData(_b, req.user)
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
    let payload = getData(_b, req.user)


    ProdDetail.update(payload,
        {
            where: {
                productDetailID: _b.productDetailID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No ProductDetails found!');
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

    if (!_b.productDetailID) {
        res.status(400).json({ status: false, message: "productDetailID does not exists" });
        return
    }

    // write a logic for is permissible to delete this productDetail
    ProdDetail.destroy(
        {
            where: {
                productDetailID: _b.productDetailID,
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
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body

    if (isAdmin) {
        ProdDetail.findAll()
            .then(c => {

                if (!c) throw new Error('No ProdDetail found!');

                // let schema = getSchema(_b.languageID)

                // let data = Serializer.serializeMany(c, ProdDetail, schema);
                res.status(200).json({ status: true, data: c });
                return
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({ status: false });
            });
    }
    // ProdDetail.findAll({
    //     include: [
    //         { model: Product },
    //     ]
    // })
    //     .then(c => {

    //         if (!c) throw new Error('No ProdDetail found!');

    //         // let schema = getSchema(_b.languageID)

    //         // let data = Serializer.serializeMany(c, ProdDetail, schema);
    //         res.status(200).json({ status: true, data: c });

    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(400).json({ status: false });
    //     });
    res.status(400).json({ status: false, message: "Not A USER API" });

};


exports.getByID = (req, res) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    let opts = {
        where: {
            product_id: req.params.product_id
        },
        include: [
            { model: Product },
        ]
    }
    let prdID = req.params.productDetailID
    if (prdID) opts.where = { productDetailID: prdID }

    ProdDetail.findAll(opts)
        .then(c => {
            if (!c) throw new Error('No ProdDetail found!');
            let schema = getProductDetailSchema(lang)

            let data = Serializer.serializeMany(c, ProdDetail, schema);
            res.status(200).json({ status: true, data });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
function getData(_b, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)

    let payload = {
        available: _b.available,
        totalPrice: _b.totalPrice,
        isFaltDiscount: _b.isFaltDiscount,
        priceExcluding: _b.priceExcluding,
        product_id: _b.product_id
    }
    if (isAr(lang)) {
        payload.sizeAr = _b.size
        payload.colorAr = _b.color
        payload.priceCurrencyAr = _b.priceCurrency
    } else {
        payload.size = _b.size
        payload.color = _b.color
        payload.priceCurrency = _b.priceCurrency
    }
    return payload
}