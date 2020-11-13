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
        orderCurrency: _b.orderCurrency,
        orderCurrencyAr: _b.orderCurrencyAr,
        orderPrice: _b.orderPrice,
        orderQuantity: _b.orderQuantity,
        product_id: _b.product_id,
        productDetail_id: _b.productDetail_id,
        address_id: _b.address_id,
        user_id: _b.user_id
    }
    const { isAdmin, userId } = getUserDetails(req.user)

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

    if (!_b.orderID) {
        res.status(400).json({ status: false, message: "orderID does not exists" });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)

    let payload = insertingData(_b, _b.orderID);

    Orders.update(payload,
        {
            where: {
                orderID: _b.orderID
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

    if (!_b.orderID) {
        res.status(400).json({ status: false, message: "orderID does not exists" });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)


    Orders.destroy(
        {
            where: {
                orderID: _b.orderID
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
    const { isAdmin, userId } = getUserDetails(req.user)

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
    const { isAdmin, userId } = getUserDetails(req.user)

    Orders.findOne({
        where: {
            orderID: req.params.orderID
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
