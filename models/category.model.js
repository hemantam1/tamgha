const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const category = connection.define('category', {
    catID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    catName: {
        type: Sequelize.STRING,
        unique: true
    },
    catNameAr: {
        type: Sequelize.STRING,
        unique: true
    }
}
);
module.exports = category;
