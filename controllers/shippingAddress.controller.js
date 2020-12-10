const Sequelize = require('sequelize');
const ShippingAddress = require('../models/shippingAddres.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getShippingAddressSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { City, Product } = require('../models/associations');
const { getShippingAddressSchema } = require('../utils/schema/schemas');

exports.add = (req, res, next) => {
    const _b = req.body;

    let payload = getData(_b, req.user)

    ShippingAddress.create(payload)
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

exports.update = (req, res, next) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.addressID) {
        res.status(400).json({ status: false, message: "addressID does not exists" });
        next('Client Error')
        return
    }

    let payload = getData(_b, req.user);

    ShippingAddress.update(payload,
        {
            where: {
                addressID: _b.addressID,
                user_id: userId
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No ShippingAddress found!');
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

    if (!_b.addressID) {
        res.status(400).json({ status: false, message: "addressID does not exists" });
        next('Client Error')
        return
    }


    ShippingAddress.destroy(
        {
            where: {
                addressID: _b.addressID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No ShippingAddress found!');
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
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body
    if (isAdmin) {
        ShippingAddress.findAll()
            .then(c => {

                if (!c) throw new Error('No ShippingAddress found!');

                // let schema = getShippingAddressSchema(_b.languageID)

                // let data = Serializer.serializeMany(c, ShippingAddress, schema);
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

    // ShippingAddress.findAll()
    //     .then(c => {

    //         if (!c) throw new Error('No ShippingAddress found!');

    //         // let schema = getShippingAddressSchema(_b.languageID)

    //         // let data = Serializer.serializeMany(c, ShippingAddress, schema);
    //         res.status(200).json({ status: true, data: c });

    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(400).json({ status: false });
    //     });
    res.status(400).json({ status: false, message: "Not A USER API" });
    next('Client Error')

};


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)


    if (!req.params.addressID && !req.params.productId) {
        res.status(400).json({ status: false, message: "No Params Name addressID / productId found" });
        next('Client Error')
        return
    }
    let opts = {
        where: {
            product_id: req.params.productId
        },
        include: [
            { model: City },
            { model: Product },
        ]
    }
    let addressId = req.params.addressID
    if (addressId) opts.where = { addressID: addressId }
    ShippingAddress.findOne(opts)
        .then(c => {
            if (!c) throw new Error('No ShippingAddress found!');
            let schema = getShippingAddressSchema(lang)
            let serializer = new Serializer(ShippingAddress, schema);
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


function getData(_b, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)
    let payload = {
        pinCode: _b.pinCode,
        phoneNo: _b.phoneNo,
        user_id: userId,
        product_id: _b.product_id,
        city_id: _b.city_id

    }
    if (isAdmin) {
        payload = {
            address: _b.address,
            addressAr: _b.addressAr,
            area: _b.area,
            areaAr: _b.areaAr,
            pinCode: _b.pinCode,
            phoneNo: _b.phoneNo,
            email: _b.email,
            emailAr: _b.emailAr,
            user_id: userId,
            product_id: _b.product_id,
            city_id: _b.city_id
        }
    }
    else if (isAr(lang)) {
        payload.addressAr = _b.address
        payload.areaAr = _b.area
        payload.emailAr = _b.email

    } else {
        payload.address = _b.address
        payload.area = _b.area
        payload.email = _b.email

    }
    return payload
}