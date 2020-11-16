const Sequelize = require('sequelize');
const ShippingAddress = require('../models/shippingAddres.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getShippingAddressSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
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
                error: err
            });
        });
};

exports.update = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.addressID) {
        res.status(400).json({ status: false, message: "addressID does not exists" });
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

    if (!_b.addressID) {
        res.status(400).json({ status: false, message: "addressID does not exists" });
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
                res.status(400).json({ status: false });
            });
    }

    ShippingAddress.findAll({
        where: {
            product_id: req.params.product_id
        }
    })
        .then(c => {

            if (!c) throw new Error('No ShippingAddress found!');

            // let schema = getShippingAddressSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, ShippingAddress, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });

};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    ShippingAddress.findOne({
        where: {
            addressID: req.params.addressID
        }
    })
        .then(c => {
            if (!c) throw new Error('No ShippingAddress found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
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