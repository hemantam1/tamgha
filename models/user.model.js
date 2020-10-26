const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');

const user = connection.define('user', {
    usrID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
    },
    usrName: {
        type: Sequelize.STRING,

    },
    profilePhoto: {
        type: Sequelize.STRING,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    firstNameAr: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    lastNameAr: {
        type: Sequelize.STRING,
    },
    phoneNo: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING,
    },
    countryAr: {
        type: Sequelize.STRING,
    },
    emailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}
);

module.exports = user;
