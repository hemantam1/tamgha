const Sequelize = require('sequelize');
const Address = require('../models/addres.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        adrsUsrType: _b.adrsUsrType,
        adrsFirstName: _b.adrsFirstName,
        adrsLastName: _b.adrsLastName,
        adrsCity: _b.adrsCity,
        adrsCountry: _b.adrsCountry,
        adrsPhoneNo: _b.adrsPhoneNo,
        adrsEmail: _b.adrsEmail,
        adrsEmailAr: _b.adrsEmailAr,
        adrsNote: _b.adrsNote,
        adrsNoteAr: _b.adrsNoteAr,
        usr_id: _b.usr_id,
        prod_id: _b.prod_id
    }

    // if (isAr(_b.languageID)) {
    //     payload = {
    //         activityNameAr: _b.activityName,
    //         activityUpgradePrice: _b.activityUpgradePrice,
    //         activityPriceCurrencyAr: _b.activityPriceCurrency,
    //         hotID: _b.hotID
    //     }
    // }
    // if (req.isAdmin) {
    //     payload = {
    //         activityName: _b.activityName,
    //         activityNameAr: _b.activityNameAr,
    //         activityUpgradePrice: _b.activityUpgradePrice,
    //         activityPriceCurrency: _b.activityPriceCurrency,
    //         activityPriceCurrencyAr: _b.activityPriceCurrencyAr,
    //         hotID: _b.hotID
    //     }
    // }
    Address.create(payload)
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

    Address.update(payload,
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


    Address.destroy(
        {
            where: {
                adrsID: _b.adrsID
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

exports.getAll = (req, res) => {
    const _b = req.body
    Address.findAll()
        .then(c => {
            // 
            if (!c) throw new Error('No Address found!');

            // let schema = getActivitySchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Address, schema);
            res.status(200).json({ status: true, data: c });
            // 
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Address.findOne({
        where: {
            adrsID: req.params.adrsID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Address found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
