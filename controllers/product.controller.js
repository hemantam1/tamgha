// const Sequelize = require('sequelize');
const Product = require('../models/product.model');
const config = require('../config');
// const { insertingData } = require('../utils/helperFunc')
// const { isAr } = require('../utils/verify')
// const { getProductSchema } = require('../utils/schema/schemas');
// const Serializer = require('sequelize-to-json');


exports.getAll = (req, res) => {
    const _b = req.body
    Product.findAll()
        .then(c => {

            if (!c) throw new Error('No Product found!');

            // let schema = getActivitySchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Activity, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};














const Sequelize = require('sequelize');
const Activity = require('../models/activity.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
const { getActivitySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        activityName: _b.activityName,
        activityUpgradePrice: _b.activityUpgradePrice,
        activityPriceCurrency: _b.activityPriceCurrency,
        hotID: _b.hotID
    }

    if (isAr(_b.languageID)) {
        payload = {
            activityNameAr: _b.activityName,
            activityUpgradePrice: _b.activityUpgradePrice,
            activityPriceCurrencyAr: _b.activityPriceCurrency,
            hotID: _b.hotID
        }
    }
    if (req.isAdmin) {
        payload = {
            activityName: _b.activityName,
            activityNameAr: _b.activityNameAr,
            activityUpgradePrice: _b.activityUpgradePrice,
            activityPriceCurrency: _b.activityPriceCurrency,
            activityPriceCurrencyAr: _b.activityPriceCurrencyAr,
            hotID: _b.hotID
        }
    }
    Activity.create(payload)
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

    if (!_b.actID) {
        res.status(400).json({ status: false, message: "actID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.actID);

    Activity.update(payload,
        {
            where: {
                actID: _b.actID
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

    if (!_b.actID) {
        res.status(400).json({ status: false, message: "actID does not exists" });
        return
    }


    Activity.destroy(
        {
            where: {
                actID: _b.actID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Activity found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    Activity.findAll()
        .then(c => {

            if (!c) throw new Error('No Activity found!');

            let schema = getActivitySchema(_b.languageID)

            let data = Serializer.serializeMany(c, Activity, schema);
            res.status(200).json({ status: true, data });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Activity.findOne({
        where: {
            actID: req.params.actID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Activity found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
