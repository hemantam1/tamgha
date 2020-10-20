const Sequelize = require('sequelize');
const City = require('../models/city.model');
const config = require('../config');

exports.add = (req, res) => {
    const _b = req.body;
    City.create({
        citName: _b.citName,
        citNameAr: _b.citNameAr,
        id_country: _b.ctryID
    })
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
    let payload = {};

    if (!_b.citID) {
        res.status(400).json({ status: false, message: "citID does not exists" });
        return
    }

    if (_b.citName)
        payload.citName = _b.citName

    if (_b.citNameAr)
        payload.citNameAr = _b.citNameAr

    City.update(payload,
        {
            where: {
                citID: _b.citID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No City found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.citID) {
        res.status(400).json({ status: false, message: "citID does not exists" });
        return
    }


    City.destroy(
        {
            where: {
                citID: _b.citID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No City found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {

    City.findAll()
        .then(c => {
            if (!c) throw new Error('No City found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    City.findOne({
        where: {
            citID: req.params.citID
        }
    })
        .then(c => {
            if (!c) throw new Error('No City found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
