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
        available: _b.available,
        color: _b.color,
        colorAr: _b.colorAr,
        priceCurrency: _b.priceCurrency,
        priceCurrencyAr: _b.priceCurrencyAr,
        totalPrice: _b.totalPrice,
        isFaltDiscount: _b.isFaltDiscount,
        priceExcluding: _b.priceExcluding,
        prod_id: _b.prod_id
    }

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

    if (!_b.prdID) {
        res.status(400).json({ status: false, message: "prdID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.prdID);

    ProdDetail.update(payload,
        {
            where: {
                prdID: _b.prdID
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

    if (!_b.prdID) {
        res.status(400).json({ status: false, message: "prdID does not exists" });
        return
    }


    ProdDetail.destroy(
        {
            where: {
                prdID: _b.prdID
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
    ProdDetail.findOne({
        where: {
            prdID: req.params.prdID
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
