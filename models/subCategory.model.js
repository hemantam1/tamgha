const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const SubCategory = connection.define('sub_category', {
    subCatID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    subCatName: {
        type: Sequelize.STRING,
        unique: true
    },
    subCatNameAr: {
        type: Sequelize.STRING,
        unique: true
    }
}
);
module.exports = SubCategory;
