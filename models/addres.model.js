const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const ShippingAddress = connection.define('address', {
    adrsID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    usrType: {
        type: Sequelize.ENUM,
        values: ['Buyer', 'Seller'],
        defaultValue: 'Buyer'
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING,
    },
    addressAr: {
        type: Sequelize.STRING,
    },
    phoneNo: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    emailAr: {
        type: Sequelize.STRING
    },
    note: {
        type: Sequelize.STRING
    },
    noteAr: {
        type: Sequelize.STRING
    },
}
);
module.exports = ShippingAddress;
