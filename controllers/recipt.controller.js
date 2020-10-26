const Sequelize = require('sequelize');
const Recipts = require('../models/recipts.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getReciptsSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        recpType: _b.recpType,
        ord_id: _b.ord_id,
        usr_id: _b.usr_id
    }


    Recipts.create(payload)
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

    if (!_b.recpID) {
        res.status(400).json({ status: false, message: "recpID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.recpID);

    Recipts.update(payload,
        {
            where: {
                recpID: _b.recpID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Recipts found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.recpID) {
        res.status(400).json({ status: false, message: "recpID does not exists" });
        return
    }


    Recipts.destroy(
        {
            where: {
                recpID: _b.recpID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Recipts found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    Recipts.findAll()
        .then(c => {

            if (!c) throw new Error('No Recipts found!');

            // let schema = getReciptsSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Recipts, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Recipts.findOne({
        where: {
            recpID: req.params.recpID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Recipts found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
