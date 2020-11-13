const Sequelize = require('sequelize');
const City = require('../models/city.model');
const config = require('../config');

exports.add = (req, res) => {
    const _b = req.body;
    const { isAdmin, userId } = getUserDetails(req.user)

    City.create({
        city: _b.city,
        cityAr: _b.cityAr,
        state_id: _b.state_id
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
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.cityID) {
        res.status(400).json({ status: false, message: "cityID does not exists" });
        return
    }

    if (_b.city)
        payload.city = _b.city

    if (_b.cityAr)
        payload.cityAr = _b.cityAr

    City.update(payload,
        {
            where: {
                cityID: _b.cityID
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
    const { isAdmin, userId } = getUserDetails(req.user)

    if (!_b.cityID) {
        res.status(400).json({ status: false, message: "cityID does not exists" });
        return
    }

    City.destroy(
        {
            where: {
                cityID: _b.cityID
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
    const { isAdmin, userId } = getUserDetails(req.user)

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
    const { isAdmin, userId } = getUserDetails(req.user)

    City.findOne({
        where: {
            cityID: req.params.cityID
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
