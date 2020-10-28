const Sequelize = require('sequelize');
const Favourite = require('../models/favourite.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getFavouriteSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        usr_id: _b.usr_id,
        prod_id: _b.prod_id,
    }

    Favourite.create(payload)
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

    if (!_b.favID) {
        res.status(400).json({
            status: false, message: "favID does not exists"
        });
        return
    }

    let payload = insertingData(_b, _b.favID);

    Favourite.update(payload,
        {
            where: {
                favID: _b.favID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Favourites found!');
            res.status(200).json({ status: true, Favourite: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.favID) {
        res.status(400).json({
            status: false, message: "favID does not exists"
        });
        return
    }


    Favourite.destroy(
        {
            where: {
                favID: _b.favID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Favourite found!');
            res.status(200).json({ status: true, Favourite: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    Favourite.findAll()
        .then(c => {

            if (!c) throw new Error('No Favourite found!');

            // let schema = getFavouriteSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Favourite, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Favourite.findOne({
        where: {
            favID: req.params.favID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Favourite found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
