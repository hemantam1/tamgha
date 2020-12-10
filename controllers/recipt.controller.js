const Sequelize = require('sequelize');
const Recipts = require('../models/recipts.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getReciptsSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getReciptSchema } = require('../utils/schema/schemas');
const { User } = require('../models/associations');

exports.add = (req, res, next) => {
    const { isAdmin, userId } = getUserDetails(req.user)
    const _b = req.body;
    let payloads = []
    let type = { type: 'sell' }
    let payload = {
        order_id: _b.order_id,
        buyer_user_id: userId,
        seller_user_id: _b.seller_user_id,
        // Join Two tables Orders, Product, Users.
        // fetch from order_id --> product_id --> user_id 
        // seller_user_id: user_id
    }
    let anotherPayload = {
        ...payload, ...type
    }
    payloads.push(payload)
    payloads.push(anotherPayload)
    console.log(payloads)
    Recipts.bulkCreate(payloads)
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

//     if (!_b.reciptID) {
//         res.status(400).json({ status: false, message: "reciptID does not exists" });
//         return
//     }

//     let payload = insertingData(_b, _b.reciptID);

//     Recipts.update(payload,
//         {
//             where: {
//                 reciptID: _b.reciptID
//             }
//         }
//     )
//         .then(c => {
//             if (!c) throw new Error('No Recipts found!');
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

    if (!_b.reciptID) {
        res.status(400).json({ status: false, message: "reciptID does not exists" });
        next('Client Error')
        return
    }
    let opts = {
        where: {
            reciptID: _b.reciptID,
            seller_user_id: userId
        }
    }
    if (_b.type === 'buy') {
        opts = {
            where: {
                reciptID: _b.reciptID,
                buyer_user_id: userId
            }
        }
    }

    Recipts.destroy(opts)
        .then(c => {
            if (!c) throw new Error('No Recipts found!');
            res.status(200).json({ status: true, delete: c });
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
        Recipts.findAll()
            .then(c => {

                if (!c) throw new Error('No Recipts found!');

                // let schema = getReciptsSchema(_b.languageID)

                // let data = Serializer.serializeMany(c, Recipts, schema);
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

    Recipts.findAll({
        where: {
            buyer_user_id: userId,
            type: 'buy'
        },
        include: [
            { model: User, as: 'Seller' },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Recipts found!');

            let schema = getReciptSchema(lang)

            let data = Serializer.serializeMany(c, Recipts, schema);
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

    if (req.params.reciptID) {
        Recipts.findOne({
            where: {
                reciptID: req.params.reciptID
            },
            include: [
                { model: User, as: 'Buyer' },
                { model: User, as: 'Seller' }

            ]
        })
            .then(c => {
                if (!c) throw new Error('No Recipts found!');
                let schema = getReciptSchema(lang)
                let serializer = new Serializer(Recipts, schema);
                let data = serializer.serialize(c);

                res.status(200).json({ status: true, data });
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
        return
    }
    Recipts.findAll({
        where: {
            seller_user_id: userId,
            type: 'sell'
        },
        include: [
            { model: User, as: 'Buyer' }
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Recipts found!');

            let schema = getReciptSchema(lang)

            let data = Serializer.serializeMany(c, Recipts, schema);
            res.status(200).json({ status: true, data });
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

};
