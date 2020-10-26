const Sequelize = require('sequelize');
const SubCategory = require('../models/subCategory.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getSubCategorySchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        subCatName: _b.subCatName,
        subCatNameAr: _b.subCatNameAr,
        cat_id: _b.cat_id
    }


    SubCategory.create(payload)
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

    if (!_b.subCatID) {
        res.status(400).json({ status: false, message: "subCatID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.subCatID);

    SubCategory.update(payload,
        {
            where: {
                subCatID: _b.subCatID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No SubCategory found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.subCatID) {
        res.status(400).json({ status: false, message: "subCatID does not exists" });
        return
    }


    SubCategory.destroy(
        {
            where: {
                subCatID: _b.subCatID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No SubCategory found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    SubCategory.findAll()
        .then(c => {

            if (!c) throw new Error('No SubCategory found!');

            // let schema = getSubCategorySchema(_b.languageID)

            // let data = Serializer.serializeMany(c, SubCategory, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    SubCategory.findOne({
        where: {
            subCatID: req.params.subCatID
        }
    })
        .then(c => {
            if (!c) throw new Error('No SubCategory found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
