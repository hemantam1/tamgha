const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');

const user = connection.define('user', {
    usrID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    usrEmail: {
        type: Sequelize.STRING,
        unique: true
    },
    usrPassword: {
        type: Sequelize.STRING,
    },
    usrFirstName: {
        type: Sequelize.STRING,
    },
    usrFirstNameAr: {
        type: Sequelize.STRING,
    },
    usrLastName: {
        type: Sequelize.STRING,
    },
    usrLastNameAr: {
        type: Sequelize.STRING,
    },
    usrPhoneNo: {
        type: Sequelize.STRING,
    },
    usrCountry: {
        type: Sequelize.STRING,
    },
    usrAddress: {
        type: Sequelize.STRING,
    },
    usrAddressAr: {
        type: Sequelize.STRING,
    },
    emailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}
);

module.exports = user;
