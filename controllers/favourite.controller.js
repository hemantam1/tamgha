const Sequelize = require('sequelize');
const Favourite = require('../models/favourite.model');
const Product = require('../models/product.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getFavouriteSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getFavouriteSchema } = require('../utils/schema/schemas');
const { User } = require('../models/associations');

exports.add = (req, res, next) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)
    let payload = {
        user_id: userId,
        product_id: _b.product_id,
    }

    Favourite.create(payload)
        .then(r => {
            res.status(200).json({ status: true, result: r });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });
};

// exports.update = (req, res) => {
//     const _b = req.body;
//     const { isAdmin, userId } = getUserDetails(req.user)

//     if (!_b.favouriteID) {
//         res.status(400).json({
//             status: false, message: "favouriteID does not exists"
//         });
//         return
//     }

//     let payload = insertingData(_b, _b.favouriteID);
//     payload.user_id = userId
//     Favourite.update(payload,
//         {
//             where: {
//                 favouriteID: _b.favouriteID
//             }
//         }
//     )
//         .then(c => {
//             if (!c) throw new Error('No Favourites found!');
//             res.status(200).json({ status: true, Favourite: c });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ status: false });
//         });
// };


exports.delete = (req, res, next) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.favouriteID) {
        res.status(400).json({
            status: false, message: "favouriteID does not exists"
        });
        next('Client Error')
    }


    Favourite.destroy(
        {
            where: {
                favouriteID: _b.favouriteID,
                user_id: userId
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Favourite found!');
            res.status(200).json({ status: true, Favourite: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });
};

exports.getAll = (req, res, next) => {
    const _b = req.body
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (isAdmin) {
        Favourite.findAll()
            .then(c => {

                if (!c) throw new Error('No Favourite found!');

                // let schema = getFavouriteSchema(_b.languageID)

                // let data = Serializer.serializeMany(c, Favourite, schema);
                res.status(200).json({ status: true, data: c });
                return
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({
                    status: false,
                    message: err.message
                });
                next(err.message);
            });
    }
    Favourite.findAll({
        where: {
            user_id: userId
        },
        include: [
            { model: Product },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Favourite found!');

            let schema = getFavouriteSchema(lang)

            let data = Serializer.serializeMany(c, Favourite, schema);
            res.status(200).json({ status: true, data });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });

};


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)
    if (!req.params.favouriteID || !req.params.product_id) {
        res.status(400).json({
            status: false, message: "No Params Name favouriteID / product_id found"
        });
        next('Client Error')
    }
    let productId = req.params.product_id
    let opts = {
        where: {
            favouriteID: req.params.favouriteID,
            user_id: userId,
        },
        include: [{
            model: User,
        }, {
            model: Product
        }
        ]
    }
    if (productId) {
        opts = {
            where: {
                product_id: productId,
                user_id: userId,
            }, include: [
                { model: User },
            ]
        }
    }
    Favourite.findAll(opts)
        .then(c => {
            if (!c) throw new Error('No Favourite found!');

            let schema = getFavouriteSchema(lang)

            let data = Serializer.serializeMany(c, Favourite, schema);
            res.status(200).json({ status: true, data });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });
};
