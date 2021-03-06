const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const prodDetails = connection.define('prod_details', {
    productDetailID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    size: {
        type: Sequelize.STRING,
    },
    sizeAr: {
        type: Sequelize.STRING,
    },
    available: {
        type: Sequelize.INTEGER,
    },
    color: {
        type: Sequelize.STRING,
    },
    colorAr: {
        type: Sequelize.STRING,
    },
    priceCurrency: {
        type: Sequelize.STRING,
    },
    priceCurrencyAr: {
        type: Sequelize.STRING,
    },
    totalPrice: {
        type: Sequelize.DOUBLE(6, 2),
    },
    isFaltDiscount: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    priceExcluding: {
        type: Sequelize.DOUBLE(6, 2),
    },

}
);
module.exports = prodDetails;
