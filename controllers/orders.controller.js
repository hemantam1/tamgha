const Sequelize = require('sequelize');
const Orders = require('../models/orders.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getOrdersSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getOrderSchema } = require('../utils/schema/schemas');
const DeliveryAddress = require('../models/deliveryAddres.model');
const ProductDetails = require('../models/prodDetails.model');
const Product = require('../models/product.model');

exports.add = (req, res) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)
    const _b = req.body;
    let payload = {
        deliveryMethod: _b.deliveryMethod,
        paymentMethod: _b.paymentMethod,
        status: _b.status,
        orderCurrency: _b.orderCurrency,
        orderPrice: _b.orderPrice,
        orderQuantity: _b.orderQuantity,
        product_id: _b.product_id,
        productDetail_id: _b.productDetail_id,
        address_id: _b.address_id,
        user_id: userId
    }

    if (isAr(lang)) {
        payload.orderCurrencyAr = _b.orderCurrency
    } else {
        payload.orderCurrency = _b.orderCurrency
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

// exports.update = (req, res) => {
//     const { isAdmin, userId } = getUserDetails(req.user)
//     const _b = req.body;

//     if (!_b.orderID) {
//         res.status(400).json({ status: false, message: "orderID does not exists" });
//         return
//     }

//     let payload = insertingData(_b, _b.orderID);

//     Orders.update(payload,
//         {
//             where: {
//                 orderID: _b.orderID
//             }
//         }
//     )
//         .then(c => {
//             if (!c) throw new Error('No Orders found!');
//             res.status(200).json({ status: true, category: c });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ status: false });
//         });
// };


exports.delete = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.orderID) {
        res.status(400).json({ status: false, message: "orderID does not exists" });
        return
    }


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
    const { isAdmin, userId, lang } = getUserDetails(req.user)
    const _b = req.body

    if (isAdmin) {
        Orders.findAll()
            .then(c => {

                if (!c) throw new Error('No Orders found!');

                // let schema = getOrdersSchema(_b.languageID)

                // let data = Serializer.serializeMany(c, Orders, schema);
                res.status(200).json({ status: true, data: c });
                return
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({ status: false });
            });
    }
    Orders.findAll({
        where: {
            user_id: userId
        },
        include: [
            { model: DeliveryAddress },
            { model: Product },
            { model: ProductDetails },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Orders found!');

            let schema = getOrderSchema(lang)

            let data = Serializer.serializeMany(c, Orders, schema);
            res.status(200).json({ status: true, data });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });


};


exports.getByID = (req, res) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    let opts = {
        where: {
            orderID: req.params.orderID
        }, include: [
            { model: Product },
            { model: ProductDetails },
            { model: DeliveryAddress },
        ]
    }
    let productId = req.params.productId
    if (productId) {
        opts.where = {
            product_id: productId,
            user_id: userId,
        }
    }
    Orders.findAll(opts)
        .then(c => {
            if (!c) throw new Error('No Orders found!');
            let schema = getOrderSchema(lang)

            let data = Serializer.serializeMany(c, Orders, schema);
            res.status(200).json({ status: true, data });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
