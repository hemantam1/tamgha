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
        invoiceID: _b.invoiceID,
        salePrice: _b.salePrice,
        paymentGateway: _b.paymentGateway,
        status: _b.status,
        isSuccesfull: _b.isSuccesfull,
        isRefunded: _b.isRefunded,
        finalAmnt: _b.finalAmnt,
        usr_id: _b.usr_id,
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

    if (!_b.transID) {
        res.status(400).json({ status: false, message: "transID does not exists" });
        return
    }

    let payload = insertingData(_b, _b.transID);

    Transaction.update(payload,
        {
            where: {
                transID: _b.transID
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

    if (!_b.transID) {
        res.status(400).json({ status: false, message: "transID does not exists" });
        return
    }


    Transaction.destroy(
        {
            where: {
                transID: _b.transID
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
            transID: req.params.transID
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
