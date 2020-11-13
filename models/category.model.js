const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const category = connection.define('category', {
    categoryID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    category: {
        type: Sequelize.STRING,
        unique: true
    },
    categoryAr: {
        type: Sequelize.STRING,
        unique: true
    }
}
);
module.exports = category;
