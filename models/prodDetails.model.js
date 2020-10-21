const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const prodDetails = connection.define('prod_details', {
    prdID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    prdAvailable: {
        type: Sequelize.INTEGER,
    },
    prdColor: {
        type: Sequelize.STRING,
    },
    prdColorAr: {
        type: Sequelize.STRING,
    },
    prdPriceCurrency: {
        type: Sequelize.STRING,
    },
    prdPriceCurrencyAr: {
        type: Sequelize.STRING,
    },
    prdPrice: {
        type: Sequelize.INTEGER,
    }
}
);
module.exports = prodDetails;
