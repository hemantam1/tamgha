const Sequelize = require('sequelize');
const ShippingAddress = require('../models/shippingAddres.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getShippingAddressSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        address: _b.address,
        country: _b.country,
        idType: _b.idType,
        idFront: _b.idFront,
        idBack: _b.idBack,
        phoneNo: _b.phoneNo,
        shiipingFrom: _b.shiipingFrom,
        email: _b.email,
        emailAr: _b.emailAr,
        usr_id: _b.usr_id,
        prod_id: _b.prod_id

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
    const _b = req.body;

    if (!_b.adrsID) {
        res.status(400).json({ status: false, message: "adrsID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.adrsID);

    ShippingAddress.update(payload,
        {
            where: {
                adrsID: _b.adrsID
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
    const _b = req.body;

    if (!_b.adrsID) {
        res.status(400).json({ status: false, message: "adrsID does not exists" });
        return
    }


    ShippingAddress.destroy(
        {
            where: {
                adrsID: _b.adrsID
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
    ShippingAddress.findOne({
        where: {
            adrsID: req.params.adrsID
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
