const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const UsrCategory = connection.define('usr_category', {
    usrCatID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    usrCatName: {
        type: Sequelize.STRING,
        unique: true
    },
    usrCatNameAr: {
        type: Sequelize.STRING,
        unique: true
    }
}
);
module.exports = UsrCategory;
