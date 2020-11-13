const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const ShippingAddress = connection.define('shipping_address', {
    addressID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    // country: {
    //     type: Sequelize.STRING,
    // },
    // countryAr: {
    //     type: Sequelize.STRING,
    // },
    address: {
        type: Sequelize.STRING,
    },
    addressAr: {
        type: Sequelize.STRING,
    },
    // city: {
    //     type: Sequelize.STRING,
    // },
    // cityAr: {
    //     type: Sequelize.STRING,
    // },
    area: {
        type: Sequelize.STRING,
    },
    areaAr: {
        type: Sequelize.STRING,
    },
    pinCode: {
        type: Sequelize.INTEGER,
    },
    // state: {
    //     type: Sequelize.STRING,
    // },
    // stateAr: {
    //     type: Sequelize.STRING,
    // },
    isTamghaShipping: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    // idType: {
    //     type: Sequelize.ENUM,
    //     values: ['Passport', 'Civil']
    // },
    // idFront: {
    //     type: Sequelize.STRING,
    // },
    // idBack: {
    //     type: Sequelize.STRING,
    // },
    phoneNo: {
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
