const Sequelize = require('sequelize');
const DeliveryAddress = require('../models/deliveryAddres.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getDeliveryAddressSchema } = require('../utils/schema/schemas');
const { City } = require('../models/associations');
const State = require('../models/state.model');
const country = require('../models/country.model');

exports.add = (req, res, next) => {
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
                message: err.message
            });
            next(err.message);
        });
};

exports.update = (req, res, next) => {
    const _b = req.body;

    if (!_b.addressID) {
        res.status(400).json({ status: false, message: "addressID does not exists" });
        next('Client Error')
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
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.addressID) {
        res.status(400).json({ status: false, message: "addressID does not exists" });
        next('Client Error')
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
    const _b = req.body
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (isAdmin) {
        DeliveryAddress.findAll({
            include: [{
                model: City,
                include: [
                    { model: State }
                ]
            }]
        }
        )
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
                res.status(400).json({
                    status: false,
                    message: err.message
                });
                next(err.message);
            });
    }
    DeliveryAddress.findAll({
        where: {
            user_id: userId
        },
        include: [{
            model: City,
            include: [
                { model: State }
            ]
        }]
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
            res.status(400).json({
                status: false,
                message: err.message
            });
            next(err.message);
        });


};


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (!req.params.addressID) {
        res.status(400).json({ status: false, message: "No Param Name addressID found" });
        next('Client Error')
        return
    }
    DeliveryAddress.findOne({
        where: {
            addressID: req.params.addressID,
            user_id: userId
        },
        include: [{
            model: City,
            include: [
                {
                    model: State,
                    include: [
                        { model: country }
                    ]
                }
            ]
        }]
    })
        .then(c => {
            if (!c) throw new Error('No DeliveryAddress found!');

            let schema = getDeliveryAddressSchema(lang)
            let serializer = new Serializer(DeliveryAddress, schema);
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