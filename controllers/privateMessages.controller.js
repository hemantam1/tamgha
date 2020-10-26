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
        usr_id: _b.usr_id,
        msg_usrID: _b.msg_usrID
    }

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

    if (!_b.msgID) {
        res.status(400).json({ status: false, message: "msgID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.msgID);

    PrivateMessage.update(payload,
        {
            where: {
                msgID: _b.msgID
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

    if (!_b.msgID) {
        res.status(400).json({ status: false, message: "msgID does not exists" });
        return
    }


    PrivateMessage.destroy(
        {
            where: {
                msgID: _b.msgID
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
    PrivateMessage.findOne({
        where: {
            msgID: req.params.msgID
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
