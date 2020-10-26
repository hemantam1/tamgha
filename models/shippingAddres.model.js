const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const ShippingAddress = connection.define('shipping_address', {
    adrsID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    country: {
        type: Sequelize.STRING,
    },
    countryAr: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    addressAr: {
        type: Sequelize.STRING,
    },
    idType: {
        type: Sequelize.ENUM,
        values: ['Passport', 'Civil']
    },
    idFront: {
        type: Sequelize.STRING,
    },
    idBack: {
        type: Sequelize.STRING,
    },
    phoneNo: {
        type: Sequelize.STRING,
    },
    shipingFrom: {
        type: Sequelize.STRING,
    },
    shipingFromAR: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING
    },
    emailAr: {
        type: Sequelize.STRING
    }
}
);
module.exports = ShippingAddress;
