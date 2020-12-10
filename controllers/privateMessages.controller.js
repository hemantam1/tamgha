const Sequelize = require('sequelize');
const PrivateMessage = require('../models/privateMessage.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getPrivateMessageSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getPrivateMessageSchema } = require('../utils/schema/schemas');
const { User } = require('../models/associations');

exports.add = (req, res, next) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;
    let payload = {
        message: _b.message,
        user_id: userId,
        to_user_id: _b.to_user_id
    }

    PrivateMessage.create(payload)
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

// exports.update = (req, res) => {
//     const { isAdmin, userId } = getUserDetails(req.user)
//     const _b = req.body;

//     if (!_b.messageID) {
//         res.status(400).json({ status: false, message: "messageID does not exists" });
//         return
//     }

//     let payload = insertingData(_b, _b.messageID);

//     PrivateMessage.update(payload,
//         {
//             where: {
//                 messageID: _b.messageID
//             }
//         }
//     )
//         .then(c => {
//             if (!c) throw new Error('No PrivateMessage found!');
//             res.status(200).json({ status: true, category: c });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ status: false });
//         });
// };


exports.delete = (req, res, next) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;

    if (!_b.messageID) {
        res.status(400).json({ status: false, message: "messageID does not exists" });
        next('Client Error')
    }


    PrivateMessage.destroy(
        {
            where: {
                messageID: _b.messageID,
                user_id: userId
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No PrivateMessage found!');
            res.status(200).json({ status: true, category: c });
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
    const { isAdmin, userId, lang } = getUserDetails(req.user)
    const _b = req.body

    if (isAdmin) {
        PrivateMessage.findAll()
            .then(c => {

                if (!c) throw new Error('No PrivateMessage found!');

                // let schema = getPrivateMessageSchema(_b.languageID)

                // let data = Serializer.serializeMany(c, PrivateMessage, schema);
                res.status(200).json({ status: true, data: c });
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

    PrivateMessage.findAll({
        where: {
            user_id: userId
        },
        include: [
            { model: User },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No PrivateMessage found!');

            let schema = getPrivateMessageSchema(lang)

            let data = Serializer.serializeMany(c, PrivateMessage, schema);
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


exports.getByID = (req, res, next) => {
    const { isAdmin, userId, lang } = getUserDetails(req.user)

    if (!req.params.messageID) {
        res.status(400).json({ status: false, message: "No param Name messageID found" });
        next('Client Error')
    }
    PrivateMessage.findAll({
        where: {
            to_user_id: req.params.to_user_id,
            user_id: userId
        }
    })
        .then(c => {
            if (!c) throw new Error('No PrivateMessage found!');
            let schema = getPrivateMessageSchema(lang)
            let serializer = new Serializer(PrivateMessage, schema);
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
