const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const DeliveryAddress = connection.define('delivery_address', {
    adrsID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    fullName: {
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
    area: {
        type: Sequelize.STRING,
    },
    block: {
        type: Sequelize.STRING,
    },
    street: {
        type: Sequelize.STRING,
    },
    avenue: {
        type: Sequelize.STRING,
    },
    houseNo: {
        type: Sequelize.STRING,
    },
    floorNo: {
        type: Sequelize.STRING,
    },
    flatNo: {
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
module.exports = DeliveryAddress;
