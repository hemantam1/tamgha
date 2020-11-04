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

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        prodName: _b.prodName,
        prodNameAr: _b.prodNameAr,
        prodDescription: _b.prodDescription,
        prodDescriptionAr: _b.prodDescriptionAr,
        priceCurrencyAr: _b.priceCurrencyAr,
        price: _b.price,
        isAvailable: _b.isAvailable,
        usr_id: _b.usr_id,
        subCat_id: _b.subCat_id
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
    const _b = req.body;

    if (!_b.prodID) {
        res.status(400).json({ status: false, message: "prodID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.prodID);

    Product.update(payload,
        {
            where: {
                prodID: _b.prodID
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
    const _b = req.body;

    if (!_b.prodID) {
        res.status(400).json({ status: false, message: "prodID does not exists" });
        return
    }


    Product.destroy(
        {
            where: {
                prodID: _b.prodID
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
    const _b = req.body
    Product.findAll()
        .then(c => {

            if (!c) throw new Error('No Product found!');

            // let schema = getProductSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Product, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Product.findOne({
        where: {
            prodID: req.params.prodID
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
    //         prodID: req.params.prodID
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
    if (!_b.photos && _b.photos.length <= 0) {
        res.json({
            status: false,
            message: "image != Array"
        })
    }
    let productPayload = {
        prodName: _b.prodName,
        prodNameAr: _b.prodNameAr,
        prodDescription: _b.prodDescription,
        prodDescriptionAr: _b.prodDescriptionAr,
        priceCurrency: _b.priceCurrency,
        priceCurrencyAr: _b.priceCurrencyAr,
        price: _b.price,
        isAvailable: _b.isAvailable,
        usr_id: _b.user_id,
        subCat_id: _b.subCat_id
    }
    // let mediaPayload = {
    //     medType: _b.medType,
    //     medValue: _b.medValue,
    //     // prod_id: _b.prod_id
    // }
    // let productDetailsPayload = {
    //     available: _b.available,
    //     color: _b.color,
    //     colorAr: _b.colorAr,
    //     priceCurrency: _b.priceCurrency,
    //     priceCurrencyAr: _b.priceCurrencyAr,
    //     totalPrice: _b.totalPrice,
    //     isFaltDiscount: _b.isFaltDiscount,
    //     priceExcluding: _b.priceExcluding,
    //     // prod_id: _b.prod_id

    // }

    Product.create(productPayload)
        .then(c => {

            if (!c) throw new Error('No Product found!');

            // let schema = getProductSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Product, schema);
            // res.status(200).json({ status: true, data: c });
            // console.log(c.dataValues.prodID)
            let productID = c.dataValues.prodID
            if (productID) {
                for (let i = 0; i < _b.photos.length; i++) {

                    try {
                        let mediaPayload = {
                            medType: _b.medType,
                            medValue: _b.photos[i],
                            prod_id: productID
                        }
                        Media.create(mediaPayload)
                    }
                    catch (err) { console.log(err) }
                }
                try {
                    for (let j = 0; j < _b.sizes.length; j++) {
                        let additionalPrice = parseInt(_b.sizes[j].additionalPrice) + parseInt(_b.price)
                        let productDetailsPayload = {
                            name: _b.sizes[j].size,
                            available: _b.sizes[j].available,
                            color: _b.sizes[j].color,
                            colorAr: _b.colorAr,
                            priceCurrency: _b.priceCurrency,
                            priceCurrencyAr: _b.priceCurrencyAr,
                            totalPrice: additionalPrice,
                            isFaltDiscount: _b.isFaltDiscount,
                            priceExcluding: _b.priceExcluding,
                            prod_id: productID
                        }
                        ProductDetails.create(productDetailsPayload)
                    }
                } catch (err) { console.log(err) }
                try {

                    let shippingAddresPayload = {
                        address: _b.address,
                        country: _b.country,
                        idType: _b.idType,
                        idFront: _b.idFront,
                        idBack: _b.idBack,
                        isTamghaShipping: false,
                        phoneNo: _b.phoneNo,
                        shipingFrom: _b.shipingFrom,
                        email: _b.email,
                        emailAr: _b.emailAr,
                        usr_id: _b.user_id,
                        prod_id: productID
                    }
                    ShippingAddress.create(shippingAddresPayload)
                        .then(s => res.json({
                            status: true,
                            data: _b
                        })
                        )
                }
                catch (err) { console.log(err) }
            }

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};