const Sequelize = require('sequelize');
const Product = require('../models/product.model');
const Media = require('../models/media.model');
const ProductDetails = require('../models/prodDetails.model');
const ShippingAddress = require('../models/shippingAddres.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getProductSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
// const { Media, ProductDetails } = require('../models/associations');
const sequelizeService = require('../services/sequelize.service');
const { getProductSchema, getExploreSchema } = require('../utils/schema/schemas');
const { User } = require('../models/associations');
const SubCategory = require('../models/subCategory.model');

exports.add = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;
    let payload = {
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

    Product.create(payload)
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
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.productID) {
        res.status(400).json({ status: false, message: "productID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.productID);

    Product.update(payload,
        {
            where: {
                productID: _b.productID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Products found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.productID) {
        res.status(400).json({ status: false, message: "productID does not exists" });
        return
    }


    Product.destroy(
        {
            where: {
                productID: _b.productID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Product found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body

    Product.findAll({
        include: [
            {
                model: User
            }, {
                model: SubCategory
            }
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Product found!');

            let schema = getProductSchema(_b.languageID)

            let data = Serializer.serializeMany(c, Product, schema);
            // console.log(data)
            res.status(200).json({ status: true, data });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    Product.findOne({
        where: {
            productID: req.params.productID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Product found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
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




exports.upload = (req, res) => {
    const _b = req.body
    const { isAdmin, userId } = getUserDetails(req.user)

    let productPayload = {
        productName: _b.productName,
        productNameAr: _b.productNameAr,
        productDescription: _b.productDescription,
        productDescriptionAr: _b.productDescriptionAr,
        priceCurrency: _b.priceCurrency,
        priceCurrencyAr: _b.priceCurrencyAr,
        price: _b.price,
        isAvailable: _b.isAvailable,
        user_id: userId,
        subCategory_id: _b.subCategory_id
    }

    Product.create(productPayload)
        .then(c => {

            if (!c) throw new Error('No Product found!');
            let productID = c.dataValues.productID
            if (productID) {
                const files = req.dir;
                if (files) {
                    console.log(files)
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
                            size: _b.sizes[j].size,
                            sizeAr: _b.sizes[j].sizeAr,
                            available: _b.sizes[j].available,
                            color: _b.sizes[j].color,
                            colorAr: _b.colorAr,
                            priceCurrency: _b.priceCurrency,
                            priceCurrencyAr: _b.priceCurrencyAr,
                            totalPrice: additionalPrice,
                            isFaltDiscount: _b.isFaltDiscount,
                            priceExcluding: _b.priceExcluding,
                            product_id: productID
                        }
                        ProductDetails.create(productDetailsPayload)
                    }
                } catch (err) {
                    console.error(err);
                    res.status(400).json({ status: false });
                }
                try {

                    let shippingAddresPayload = {
                        address: _b.locationTitle,
                        area: _b.locationArea,
                        pinCode: _b.locationCode,
                        isTamghaShipping: false,
                        phoneNo: _b.phoneNo,
                        email: _b.email,
                        emailAr: _b.emailAr,
                        city_id: _b.city_id,
                        user_id: _b.user_id,
                        product_id: productID
                    }
                    ShippingAddress.create(shippingAddresPayload)
                        .then(s => res.json({
                            status: true,
                            data: _b
                        })
                        )
                }
                catch (err) {
                    console.error(err);
                    res.status(400).json({ status: false });
                }
            }

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};



exports.explore = (req, res) => {
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
            res.status(400).json({ status: false });
        });
};
