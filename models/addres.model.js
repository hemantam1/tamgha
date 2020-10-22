const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const ShippingAddress = connection.define('address', {
    adrsID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    adrsUsrType: {
        type: Sequelize.ENUM,
        values: ['Buyer', 'Seller'],
        defaultValue: 'Buyer'
    },
    adrsFirstName: {
        type: Sequelize.STRING,
    },
    adrsLastName: {
        type: Sequelize.STRING,
    },
    adrsCity: {
        type: Sequelize.STRING,
    },
    adrsCountry: {
        type: Sequelize.STRING
    },
    adrsPhoneNo: {
        type: Sequelize.STRING
    },
    adrsEmail: {
        type: Sequelize.STRING
    },
    adrsEmailAr: {
        type: Sequelize.STRING
    },
    adrsNote: {
        type: Sequelize.STRING
    },
    adrsNoteAr: {
        type: Sequelize.STRING
    },
}
);
module.exports = ShippingAddress;
