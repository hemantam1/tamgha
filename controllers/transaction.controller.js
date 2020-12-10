const Sequelize = require('sequelize');
const Transaction = require('../models/transaction.model');
const config = require('../config');
const { insertingData, getUserDetails } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getTransactionSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');
const { getTransactionSchema } = require('../utils/schema/schemas');
const { Orders } = require('../models/associations');

exports.add = (req, res, next) => {
    const _b = req.body;

    let payload = getData(_b, req.user)

    Transaction.create(payload)
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
//     const _b = req.body;

//     if (!_b.transactionID) {
//         res.status(400).json({ status: false, message: "transactionID does not exists" });
//         return
//     }
//     const { isAdmin, userId } = getUserDetails(req.user)

//     let payload = insertingData(_b, _b.transactionID);

//     Transaction.update(payload,
//         {
//             where: {
//                 transactionID: _b.transactionID
//             }
//         }
//     )
//         .then(c => {
//             if (!c) throw new Error('No Transaction found!');
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

    if (!_b.transactionID) {
        res.status(400).json({ status: false, message: "transactionID does not exists" });
        next('Client Error')
    }

    Transaction.destroy(
        {
            where: {
                transactionID: _b.transactionID
            }
        }
    )
        .then(c => {
            if (!c) throw new Error('No Transaction found!');
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
        Transaction.findAll()
            .then(c => {

                if (!c) throw new Error('No Transaction found!');

                // let schema = getTransactionSchema(_b.languageID)

                // let data = Serializer.serializeMany(c, Transaction, schema);
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
    Transaction.findAll({
        where: { user_id: userId },
        include: [
            { model: Orders },
        ]
    })
        .then(c => {

            if (!c) throw new Error('No Transaction found!');

            let schema = getTransactionSchema(lang)

            let data = Serializer.serializeMany(c, Transaction, schema);
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


    if (!req.params.transactionID) {
        res.status(400).json({ status: false, message: "No param Name transactionID exists" });
        next('Client Error')
    }
    Transaction.findOne({
        where: {
            transactionID: req.params.transactionID,
            user_id: userId,
        }
    })
        .then(c => {
            if (!c) throw new Error('No Transaction found!');
            let schema = getTransactionSchema(lang)
            let serializer = new Serializer(Transaction, schema);
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


function getData(_b, user) {
    const { isAdmin, userId } = getUserDetails(user)
    let payload = {
        salePrice: _b.salePrice,
        paymentGateway: _b.paymentGateway,
        status: _b.status,
        isSuccesfull: _b.isSuccesfull,
        isRefunded: _b.isRefunded,
        finalAmmount: _b.finalAmmount,
        user_id: userId,
        order_id: _b.order_id
    }
    return payload
}