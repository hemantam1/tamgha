const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const SubCategory = connection.define('sub_category', {
    subCategoryID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    subCategory: {
        type: Sequelize.STRING,
        unique: true
    },
    subCategoryAr: {
        type: Sequelize.STRING,
        unique: true
    }
}
);
module.exports = SubCategory;
