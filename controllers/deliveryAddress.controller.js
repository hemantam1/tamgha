const Sequelize = require('sequelize');
const DeliveryAddress = require('../models/deliveryAddres.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getDeliveryAddressSchema } = require('../utils/schema/schemas');
const { City } = require('../models/associations');

exports.add = (req, res) => {
    const _b = req.body;

    let payload = getData(_b, req.user)

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

    if (!_b.addressID) {
        res.status(400).json({ status: false, message: "addressID does not exists" });
        return
    }

    let payload = getData(_b, req.user)

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
                addressID: _b.addressID,
                user_id: userId
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
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (isAdmin) {
        DeliveryAddress.findAll()
            .then(c => {
                // 
                if (!c) throw new Error('No DeliveryAddress found!');

                let schema = getDeliveryAddressSchema(lang)

                let data = Serializer.serializeMany(c, DeliveryAddress, schema);
                res.status(200).json({ status: true, data });
                // 
                return
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({ status: false });
            });
    }
    DeliveryAddress.findAll({
        where: {
            user_id: userId
        },
        include: [
            { model: City },
        ]
    })
        .then(c => {
            // console.log(c)
            if (!c) throw new Error('No DeliveryAddress found!');

            let schema = getDeliveryAddressSchema(lang)

            // console.log(DeliveryAddress, schema)
            let data = Serializer.serializeMany(c, DeliveryAddress, schema);

            res.status(200).json({ status: true, data });
            // 
            return
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

function getData(_b, user) {
    const { isAdmin, userId, lang } = getUserDetails(user)
    let payload = {
        houseNo: _b.houseNo,
        floorNo: _b.floorNo,
        flatNo: _b.flatNo,
        phoneNo: _b.phoneNo,
        user_id: userId,
        city_id: _b.city_id
    }
    if (isAr(lang)) {
        payload.firstNameAr = _b.firstName
        payload.lastNameAr = _b.lastName
        payload.fullNameAr = _b.fullName
        payload.addressAr = _b.addressAr
        payload.emailAr = _b.emailAr
        payload.noteAr = _b.noteAr
        payload.areaAr = _b.area
        payload.blockAr = _b.block
        payload.streetAr = _b.street
        payload.avenueAr = _b.avenue
    }
    else {
        payload.firstName = _b.firstName
        payload.lastName = _b.lastName
        payload.fullName = _b.fullName
        payload.address = _b.address
        payload.email = _b.email
        payload.note = _b.note
        payload.area = _b.area
        payload.block = _b.block
        payload.street = _b.street
        payload.avenue = _b.avenue
    }
    return payload
}