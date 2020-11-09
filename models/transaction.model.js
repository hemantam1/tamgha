const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const Transaction = connection.define('transaction', {
    transactionID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    transactionDetails: {
        type: Sequelize.TEXT,
    },
    transactionDetailsAr: {
        type: Sequelize.TEXT,
    },
    currency: {
        type: Sequelize.STRING
    },
    currencyAr: {
        type: Sequelize.STRING
    },
    salesPrice: {
        type: Sequelize.DOUBLE(8, 2),
    },
    paymentGateway: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    },
    isSuccesfull: {
        type: Sequelize.STRING,
    },
    isRefunded: {
        type: Sequelize.STRING,
    },
    collectedAmmount: {
        type: Sequelize.DOUBLE(8, 2),
    },
    finalAmmount: {
        type: Sequelize.DOUBLE(8, 2),
    }
}
);
module.exports = Transaction;
