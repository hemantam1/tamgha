const Sequelize = require('sequelize');
const DeliveryAddress = require('../models/deliveryAddres.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

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
        noteAr: _b.noteAr,
        user_id: userId
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
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.addressID) {
        res.status(400).json({ status: false, message: "addressID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.addressID);
    payload.user_id = userId
    DeliveryAddress.update(payload,
        {
            where: {
                addressID: _b.addressID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Address found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.addressID) {
        res.status(400).json({ status: false, message: "addressID does not exists" });
        return
    }


    DeliveryAddress.destroy(
        {
            where: {
                addressID: _b.addressID
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
    const { isAdmin, userId } = getUserDetails(req.user)

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
    const { isAdmin, userId } = getUserDetails(req.user)

    DeliveryAddress.findOne({
        where: {
            addressID: req.params.addressID
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
