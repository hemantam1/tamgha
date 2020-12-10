const Sequelize = require('sequelize');
const Product = require('../models/product.model');
const Media = require('../models/media.model');
const ProductDetails = require('../models/prodDetails.model');
const ShippingAddress = require('../models/shippingAddres.model');
const config = require('../config');
const { insertingData, getUserDetails, getDataWithLikes } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getProductSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
// const { Media, ProductDetails } = require('../models/associations');
const sequelizeService = require('../services/sequelize.service');
const { getProductSchema, getExploreSchema } = require('../utils/schema/schemas');
const { User, } = require('../models/associations');
const SubCategory = require('../models/subCategory.model');
const Likes = require('../models/likes.model')

exports.add = (req, res, next) => {
    const _b = req.body;
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (isAdmin) {
        let payload = getData(_b, req.user)

        Product.create(payload)
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
    }

    let payload = getData(_b, req.user)

    Product.create(payload)
        .then(c => {

            if (!c) throw new Error('No Product found!');
            let productID = c.dataValues.productID
            if (productID) {
                const files = req.dir;
                if (files) {
                    // console.log(files)
                    Media.bulkCreate(files)
                        .then((media) => {
                            console.log(media);
                            return
                        })
                        .catch((err) => reject(res, err));
                }

                try {
                    for (let j = 0; j < _b.sizes.length; j++) {
                        let additionalPrice = parseInt(_b.sizes[j].additionalPrice) + parseInt(_b.price)
                        let productDetailsPayload = {
                            available: _b.sizes[j].available,
                            totalPrice: additionalPrice,
                            isFaltDiscount: _b.isFaltDiscount,
                            priceExcluding: _b.priceExcluding,
                            product_id: productID
                        }
                        if (isAr(lang)) {
                            productDetailsPayload.sizeAr = _b.sizes[j].size
                            productDetailsPayload.colorAr = _b.sizes[j].color
                            productDetailsPayload.priceCurrencyAr = _b.priceCurrency
                        } else {
                            productDetailsPayload.size = _b.sizes[j].size
                            productDetailsPayload.color = _b.sizes[j].color
                            productDetailsPayload.priceCurrency = _b.priceCurrency
                        }
                        ProductDetails.create(productDetailsPayload)
                    }
                } catch (err) {
                    console.error(err);
                    res.status(400).json({
                        status: false,
                        message: err.message
                    });
                    next(err.message);
                }
                try {

                    let shippingAddresPayload = {
                        pinCode: _b.locationCode,
                        isTamghaShipping: false,
                        phoneNo: _b.phoneNo,
                        city_id: _b.city_id,
                        user_id: _b.user_id,
                        product_id: productID
                    }
                    if (isAr(lang)) {
                        shippingAddresPayload.addressAr = _b.locationTitle
                        shippingAddresPayload.areaAr = _b.locationArea
                        shippingAddresPayload.emailAr = _b.email
                    } else {
                        shippingAddresPayload.address = _b.locationTitle
                        shippingAddresPayload.area = _b.locationArea
                        shippingAddresPayload.email = _b.email
                    }
                    ShippingAddress.create(shippingAddresPayload)
                        .then(s => res.json({
                            status: true,
                            data: _b
                        })
                        )
                        .catch(err => {
                            res.status(400).json({
                                status: false,
                                message: err.message
                            });
                            next(err.message);
                        })
                }
                catch (err) {
                    console.error(err);
                    res.status(400).json({
                        status: false,
                        message: err.message
                    });
                    next(err.message);
                }
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

exports.update = (req, res, next) => {
    const _b = req.body;

    if (!_b.productID) {
        res.status(400).json({ status: false, message: "productID does not exists" });
        next('Client Error')
        return
    }

    let payload = getData(_b, req.user)

    Product.update(payload,
        {
            where: {
                productID: _b.productID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Products found!');
            res.status(200).json({ status: true, update: c });
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


exports.delete = (req, res, next) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;
    // console.log(data[0].productID)

    if (!_b.productID) {
        res.status(400).json({ status: false, message: "productID does not exists" });
        next('Client Error')
        return
    }


    Product.destroy(
        {
            where: {
                productID: _b.productID,
                user_id: userId
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Product found!');
            res.status(200).json({ status: true, delete: c });
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

    Product.findAll({
        include: [
            {
                model: SubCategory
            }
        ]
    })
        .then(c => {
            if (!c) throw new Error('No Product found!');

            let schema = getProductSchema(lang)

            let data = Serializer.serializeMany(c, Product, schema);

            getDataWithLikes(data, userId)
                .then(dat => res.status(200).json({ status: true, data: dat }))
                .catch(err => {
                    console.error(err);
                    res.status(400).json({ status: false });
                });

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

    if (!req.params.productID) {
        res.status(400).json({ status: false, message: "No param Name productID exists" });
        next('Client Error')
        return
    }

    Product.findOne({
        where: {
            productID: req.params.productID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Product found!');
            let schema = getProductSchema(lang)
            let serializer = new Serializer(Product, schema);
            let data = serializer.serialize(c);

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



exports.uploadPhotos = (req, res, next) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const files = req.files
    if (!files) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        res.json({
            upload: false,
            Message: error
        })
        return
    }
    console.log(files)

    res.send(files)

    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

    // Product.findOne({
    //     where: {
    //         productID: req.params.productID
    //     }
    // })
    //     .then(c => {
    //         if (!c) throw new Error('No Product found!');
    //         res.status(200).json({ status: true, data: c });
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(400).json({ status: false });
    //     });
};




exports.explore = (req, res, next) => {
    // const _b = req.body
    const { isAdmin, userId } = getUserDetails(req.user)

    // write a condition for products having more no of likes
    Product.findAll()
        .then(c => {

            if (!c) throw new Error('No Product found!');

            let schema = getExploreSchema()

            let data = Serializer.serializeMany(c, Product, schema);
            // console.log(data)
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


function getData(_b, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)
    let payload = {
        price: _b.price,
        isAvailable: _b.isAvailable,
        user_id: userId,
        subCategory_id: _b.subCategory_id
    }

    if (isAdmin) {
        payload = {
            productName: _b.productName,
            productName: _b.productName,
            productDescription: _b.productDescription,
            productDescriptionAr: _b.productDescriptionAr,
            priceCurrencyAr: _b.priceCurrencyAr,
            price: _b.price,
            isAvailable: _b.isAvailable,
            user_id: userId,
            subCategory_id: _b.subCategory_id
        }
    } else if (isAr(lang)) {
        payload.productNameAr = _b.productName
        payload.productDescriptionAr = _b.productDescription
        payload.priceCurrencyAr = _b.priceCurrency

    } else {
        payload.productName = _b.productName
        payload.productDescription = _b.productDescription
        payload.priceCurrency = _b.priceCurrency
    }
    return payload
}