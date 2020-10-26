const Sequelize = require('sequelize');
const Orders = require('../models/orders.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getOrdersSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        deliveryMethod: _b.deliveryMethod,
        paymentMethod: _b.paymentMethod,
        status: _b.status,
        ordCurrency: _b.ordCurrency,
        ordCurrencyAr: _b.ordCurrencyAr,
        ordPrice: _b.ordPrice,
        ordQuantity: _b.ordQuantity,
        prod_id: _b.prod_id,
        prdetail_id: _b.prdetail_id,
        del_address: _b.del_address,
        usr_id: _b.usr_id
    }

    Orders.create(payload)
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

    if (!_b.ordID) {
        res.status(400).json({ status: false, message: "ordID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.ordID);

    Orders.update(payload,
        {
            where: {
                ordID: _b.ordID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Orders found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.ordID) {
        res.status(400).json({ status: false, message: "ordID does not exists" });
        return
    }


    Orders.destroy(
        {
            where: {
                ordID: _b.ordID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Orders found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    Orders.findAll()
        .then(c => {

            if (!c) throw new Error('No Orders found!');

            // let schema = getOrdersSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Orders, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Orders.findOne({
        where: {
            ordID: req.params.ordID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Orders found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
