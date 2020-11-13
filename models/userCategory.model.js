const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const UserCategory = connection.define('user_category', {
    userCategoryID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userCategory: {
        type: Sequelize.STRING,
        unique: true
    },
    userCategoryAr: {
        type: Sequelize.STRING,
        unique: true
    }
}
);
module.exports = UserCategory;
