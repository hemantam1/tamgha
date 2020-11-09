const Sequelize = require('sequelize');
const Transaction = require('../models/transaction.model');
const config = require('../config');
const { insertingData } = require('../utils/helperFunc')
const { isAr } = require('../utils/verify')
// const { getTransactionSchema } = require('../utils/schema/schemas');
const Serializer = require('sequelize-to-json');

exports.add = (req, res) => {
    const _b = req.body;
    let payload = {
        salePrice: _b.salePrice,
        paymentGateway: _b.paymentGateway,
        status: _b.status,
        isSuccesfull: _b.isSuccesfull,
        isRefunded: _b.isRefunded,
        finalAmmount: _b.finalAmmount,
        user_id: _b.user_id,
        order_id: _b.order_id

    }


    Transaction.create(payload)
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

    if (!_b.transactionID) {
        res.status(400).json({ status: false, message: "transactionID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.transactionID);

    Transaction.update(payload,
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
            res.status(400).json({ status: false });
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if (!_b.transactionID) {
        res.status(400).json({ status: false, message: "transactionID does not exists" });
        return
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
            res.status(400).json({ status: false });
        });
};

exports.getAll = (req, res) => {
    const _b = req.body
    Transaction.findAll()
        .then(c => {

            if (!c) throw new Error('No Transaction found!');

            // let schema = getTransactionSchema(_b.languageID)

            // let data = Serializer.serializeMany(c, Transaction, schema);
            res.status(200).json({ status: true, data: c });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};


exports.getByID = (req, res) => {
    Transaction.findOne({
        where: {
            transactionID: req.params.transactionID
        }
    })
        .then(c => {
            if (!c) throw new Error('No Transaction found!');
            res.status(200).json({ status: true, data: c });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
};
