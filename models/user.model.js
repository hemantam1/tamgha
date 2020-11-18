const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');

const user = connection.define('user', {
    userID: {
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
    userType: {
        type: Sequelize.ENUM,
        values: ['User', 'Admin'],
        defaultValue: 'User'
    },
    userName: {
        type: Sequelize.STRING,
    },
    userNameAr: {
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
    // country: {
    //     type: Sequelize.STRING,
    // },
    // countryAr: {
    //     type: Sequelize.STRING,
    // },
    prefferedLanguageCode: {
        type: Sequelize.STRING,
    },
    noOfFollowers: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    noOfFollowings: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    idType: {
        type: Sequelize.ENUM,
        values: ['Passport', 'Civil'],
        allowNull: true
    },
    idFront: {
        type: Sequelize.STRING,
    },
    idBack: {
        type: Sequelize.STRING,
    },
    categorySelected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isCivilIdUpload: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    emailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}
);

module.exports = user;
