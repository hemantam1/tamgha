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
    address: {
        type: Sequelize.STRING,
    },
    idType: {
        type: Sequelize.STRING,
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
    shiipingFrom: {
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
