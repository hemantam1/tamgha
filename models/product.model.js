const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const product = connection.define('product', {
    productID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    productName: {
        type: Sequelize.STRING,
    },
    productNameAr: {
        type: Sequelize.STRING,
    },
    productDescription: {
        type: Sequelize.STRING,
    },
    productDescriptionAr: {
        type: Sequelize.STRING,
    },
    priceCurrency: {
        type: Sequelize.STRING,
    },
    priceCurrencyAr: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DOUBLE(6, 2),
    },
    isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}
);
module.exports = product;
