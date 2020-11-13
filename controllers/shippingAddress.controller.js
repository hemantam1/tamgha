const Sequelize = require('sequelize');
const ShippingAddress = require('../models/shippingAddres.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getShippingAddressSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;
    let payload = {
        address: _b.address,
        country: _b.country,
        idType: _b.idType,
        idFront: _b.idFront,
        idBack: _b.idBack,
        phoneNo: _b.phoneNo,
        email: _b.email,
        emailAr: _b.emailAr,
        user_id: userId,
        product_id: _b.product_id

    }


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
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.addressID) {
        res.status(400).json({ status: false, message: "addressID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.addressID);
    payload.user_id = userId
    ShippingAddress.update(payload,
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
