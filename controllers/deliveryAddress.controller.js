const Sequelize = require('sequelize');
const DeliveryAddress = require('../models/deliveryAddres.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        firstName: _b.firstName,
        lastName: _b.lastName,
        fullName: _b.fullName,
        city: _b.city,
        country: _b.country,
        address: _b.address,
        addressAr: _b.addressAr,
        area: _b.area,
        block: _b.block,
        street: _b.street,
        avenue: _b.avenue,
        houseNo: _b.houseNo,
        floorNo: _b.floorNo,
        flatNo: _b.flatNo,
        phoneNo: _b.phoneNo,
        email: _b.email,
        emailAr: _b.emailAr,
        note: _b.note,
        noteAr: _b.noteAr
    }

    DeliveryAddress.create(payload)
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

    DeliveryAddress.update(payload,
        {
            where: {
                adrsID: _b.adrsID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Activities found!');
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


    DeliveryAddress.destroy(
        {
            where: {
                adrsID: _b.adrsID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No DeliveryAddress found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    DeliveryAddress.findAll()
        .then(c => {
            // 
            if (!c) throw new Error('No DeliveryAddress found!');

            // let schema = getActivitySchema(_b.languageID)

            // let data = Serializer.serializeMany(c, DeliveryAddress, schema);
            res.status(200).json({ status: true, data: c });
            // 
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    DeliveryAddress.findOne({
        where: {
            adrsID: req.params.adrsID
        }
    })
        .then(c => {
            if (!c) throw new Error('No DeliveryAddress found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
