const Sequelize = require('sequelize');
const Cart = require('../models/cart.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getCartSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        quantity: _b.quantity,
        price: _b.price,
        product_id: _b.product_id,
    }
    const { isAdmin, userId } = getUserDetails(req.user)


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
    const { isAdmin, userId } = getUserDetails(req.user)

    let payload = insertingData(_b, _b.cartID);

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

    if (!_b.cartID) {
        res.status(400).json({
            status: false, message: "cartID does not exists"
        });
        return
    }


    Cart.destroy({
        where: {
            cartID: _b.cartID
        }
    })
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
    const _b = req.body
    const { isAdmin, userId } = getUserDetails(req.user)
    console.log(userId, "User", isAdmin)
    Cart.findAll()
        .then(c => {

            if (!c) throw new Error('No Cart found!');

            // let schema = getCartSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Cart, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    Cart.findOne({
        where: {
            cartID: req.params.cartID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Cart found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
