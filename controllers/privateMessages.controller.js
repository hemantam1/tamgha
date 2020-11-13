const Sequelize = require('sequelize');
const PrivateMessage = require('../models/privateMessage.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getPrivateMessageSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        message: _b.message,
        user_id: _b.user_id,
        to_user_id: _b.to_user_id
    }
    const { isAdmin, userId } = getUserDetails(req.user)

    PrivateMessage.create(payload)
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

    if (!_b.messageID) {
        res.status(400).json({ status: false, message: "messageID does not exists" });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)

    let payload = insertingData(_b, _b.messageID);

    PrivateMessage.update(payload,
        {
            where: {
                messageID: _b.messageID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No PrivateMessage found!');
            res.status(200).json({ status: true, category: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.messageID) {
        res.status(400).json({ status: false, message: "messageID does not exists" });
        return
    }
    const { isAdmin, userId } = getUserDetails(req.user)


    PrivateMessage.destroy(
        {
            where: {
                messageID: _b.messageID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No PrivateMessage found!');
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

    PrivateMessage.findAll()
        .then(c => {

            if (!c) throw new Error('No PrivateMessage found!');

            // let schema = getPrivateMessageSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, PrivateMessage, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    const { isAdmin, userId } = getUserDetails(req.user)

    PrivateMessage.findOne({
        where: {
            messageID: req.params.messageID
        }
    })
        .then(c => {
            if (!c) throw new Error('No PrivateMessage found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
