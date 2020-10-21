const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const orders = connection.define('orders', {
    ordID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    ordCurrency: {
        type: Sequelize.STRING,
    },
    ordCurrencyAr: {
        type: Sequelize.STRING,
    },
    ordPrice: {
        type: Sequelize.INTEGER,
    },
    ordQuantity: {
        type: Sequelize.INTEGER,
    }
}
);
module.exports = orders;
