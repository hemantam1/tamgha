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

exports.add = (req, res) => {
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
                error: err
            });
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


exports.delete = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.favouriteID) {
        res.status(400).json({
            status: false, message: "favouriteID does not exists"
        });
        return
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
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
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
                res.status(400).json({ status: false });
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
            res.status(400).json({ status: false });
        });

};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    let productId = req.params.product_id
    let opts = {
        where: {
            favouriteID: req.params.favouriteID
        }
    }
    if (productId) {
        opts = {
            where: {
                product_id: productId
            }, include: [
                { model: User },
            ]
        }
    }
    Favourite.findAll(opts)
        .then(c => {
            if (!c) throw new Error('No Favourite found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
