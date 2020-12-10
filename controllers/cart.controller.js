const Sequelize = require('sequelize');
const Cart = require('../models/cart.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
const { getCartSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { User, Product } = require('../models/associations');

exports.add = (req, res, next) => {

    let payload = getData(req.body, req.user)

    Cart.create(payload)
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

    if (!_b.cartID) {
        res.status(400).json({
            status: false, message: "cartID does not exists",
            message: err.message
        });
        next('Client Error');
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
            res.status(400).json({ status: false, message: err.message });
        });
};


exports.delete = (req, res, next) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.cartID) {
        res.status(400).json({
            status: false, message: "cartID does not exists", message: err.message
        });
        next('Client Error');
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
            res.status(400).json({ status: false, message: err.message });
            next(err.message);
        });

};

exports.getAll = (req, res, next) => {
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
                res.status(400).json({ status: false, message: err.message });
                next(err.message);
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
            res.status(400).json({ status: false, message: err.message });
            next(err.message);
        });


};


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (!req.params.cartID) {
        res.status(400).json({
            status: false, message: "No Param Name cartID found ", message: err.message
        });
        next('Client Error');
        return
    }
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
            res.status(400).json({ status: false, message: err.message });
            next(err.message);
        });
};


function getData(body, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)

    let payload = {
        quantity: body.quantity,
        price: body.price,
        product_id: body.product_id,
        user_id: userId
    }
    if (isAr(lang)) {
        payload.priceCurrencyAr = body.priceCurrency
    } else {
        payload.priceCurrency = body.priceCurrency
    }
    return payload
}