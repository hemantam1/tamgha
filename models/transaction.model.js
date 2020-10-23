const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const Transaction = connection.define('transaction', {
    transID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    transInvoiceID: {
        type: Sequelize.INTEGER,
        defaultValue: '0000'
    },
    transSalePrice: {
        type: Sequelize.DOUBLE,
    },
    transPaymentGateway: {
        type: Sequelize.STRING,
    },
    transStatus: {
        type: Sequelize.STRING,
    },
    isSuccesfull: {
        type: Sequelize.STRING,
    },
    isRefunded: {
        type: Sequelize.STRING,
    },
    collectedAmnt: {
        type: Sequelize.STRING,
    },
    finalAmnt: {
        type: Sequelize.STRING,
    }
}
);
module.exports = Transaction;
