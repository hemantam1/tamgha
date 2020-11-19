const Sequelize = require('sequelize');
const Cart = require('../models/cart.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
const { getCartSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { User, Product } = require('../models/associations');

exports.add = (req, res) => {

    let payload = getData(req.body, req.user)

    Cart.create(payload)
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

    if (!_b.cartID) {
        res.status(400).json({
            status: false, message: "cartID does not exists"
        });
        return
    }

    let payload = getData(_b, req.user)

    Cart.update(payload,
        {
            where: {
                cartID: _b.cartID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Carts found!');
            res.status(200).json({ status: true, Cart: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.cartID) {
        res.status(400).json({
            status: false, message: "cartID does not exists"
        });
        return
    }

    let payload = {
        where: {
            cartID: _b.cartID,
        }
    }
    if (!isAdmin) {
        payload.where.user_id = userId
    }

    // console.log(payload, "payload")
    Cart.destroy(payload)
        .then(c => {
            if (!c) throw new Error('No Cart found!');
            res.status(200).json({ status: true, Cart: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    // const _b = req.body
    const { isAdmin, userId, lang } = getUserDetails(req.user)
    // console.log(userId, "User", isAdmin)
    if (isAdmin) {
        Cart.findAll(
            {
                include: [
                    { model: User },
                    { model: Product },
                ]
            })
            .then(c => {
                if (!c) throw new Error('No Cart found!');

                let schema = getCartSchema(lang)

                let data = Serializer.serializeMany(c, Cart, schema);
                res.status(200).json({ status: true, data });
                return
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({ status: false });
            });
    }
    Cart.findAll({
        where: {
            user_id: userId
        },
        include: [
            { model: User },
            { model: Product },
        ]
    }).then(c => {
        if (!c) throw new Error('No Cart found!');

        let schema = getCartSchema(lang)

        let data = Serializer.serializeMany(c, Cart, schema);
        res.status(200).json({ status: true, data });
    })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });


};


exports.getByID = (req, res) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    Cart.findOne({
        where: {
            cartID: req.params.cartID,
            user_id: userId,
        }, include: [
            { model: User },
            { model: Product }
        ]
    })
        .then(c => {
            if (!c) throw new Error('No Cart found!');

            let schema = getCartSchema(lang)
            let serializer = new Serializer(Cart, schema);
            let data = serializer.serialize(c);

            res.status(200).json({ status: true, data });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


function getData(body, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)

    let payload = {
        quantity: _b.quantity,
        price: _b.price,
        product_id: _b.product_id,
        user_id: userId
    }
    if (isAr(lang)) {
        payload.priceCurrencyAr = body.priceCurrency
    } else {
        payload.priceCurrency = body.priceCurrency
    }
    return payload
}