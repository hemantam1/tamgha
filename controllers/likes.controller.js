const Sequelize = require('sequelize');
const Likes = require('../models/likes.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getLikesSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const Product = require('../models/product.model');
const { getLikeSchema } = require('../utils/schema/schemas');

exports.add = (req, res, next) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;
    let payload = {
        user_id: userId,
        product_id: _b.product_id
    }

    Likes.create(payload)
        .then(r => {
            if (!r) throw Error("Could Not be created")
            if (r) {
                (async () => {
                    // await sequelize.sync();
                    let product = await Product.findOne({
                        where: {
                            productID: _b.product_id,
                        }
                    });
                    if (!product.noOfLikes) {
                        res.status(400).json({ status: false, message: 'No Product Found' });
                        next('Client Error')
                        return
                    }
                    // console.log(product.noOfLikes); // 'John Doe'
                    product.noOfLikes = 1;
                    await product.save();
                    res.status(200).json({ status: true, result: r });

                })();
                // let product = Product.update(payload,

                // );
                // product.totalNoOfLikes = 1
            }
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

//     if (!_b.likeID) {
//         res.status(400).json({ status: false, message: "likeID does not exists" });
//         return
//     }
//     const { isAdmin, userId } = getUserDetails(req.user)

//     let payload = insertingData(_b, _b.likeID);

//     Likes.update(payload,
//         {
//             where: {
//                 likeID: _b.likeID
//             }
//         }
//     )
//         .then(c => {
//             if (!c) throw new Error('No LIKES found!');
//             res.status(200).json({ status: true, category: c });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ status: false });
//         });
// };


exports.delete = (req, res, next) => {
    const _b = req.body;

    if (!_b.likeID) {
        res.status(400).json({ status: false, message: "likeID does not exists" });
        next('Client Error')
    }
    const { isAdmin, userId } = getUserDetails(req.user)


    Likes.destroy(
        {
            where: {
                likeID: _b.likeID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Likes found!');
            res.status(200).json({ status: true, category: c });
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
    const { isAdmin, userId, lang } = getUserDetails(req.user)
    const _b = req.body

    if (isAdmin) {
        Likes.findAll()
            .then(c => {

                if (!c) throw new Error('No Likes found!');

                // let schema = getLikesSchema(_b.languageID)

                // let data = Serializer.serializeMany(c, Likes, schema);
                res.status(200).json({ status: true, data: c });

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

    // write a query for user has a product and user fetching likes of his product
    Likes.findAll({
        where: {
            user_id: userId
        },
        include: [
            { model: Product },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Likes found!');

            let schema = getLikeSchema(lang)

            let data = Serializer.serializeMany(c, Likes, schema);
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

    if (!req.params.likeID || !req.params.product_id) {
        res.status(400).json({ status: false, message: "No Parama Name likeID / product_id found" });
        next('Client Error')
    }
    let opts = {
        where: {
            likeID: req.params.likeID
        },
        include: [
            { model: Product },
        ]
    }
    let productId = req.params.product_id

    if (productId) {
        opts.where = {
            product_id: productId,
        }
    }
    Likes.findAll(opts)
        .then(c => {
            if (!c) throw new Error('No Likes found!');

            let schema = getLikeSchema(lang)

            let data = Serializer.serializeMany(c, Likes, schema);

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
