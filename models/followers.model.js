const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const followers = connection.define('followers', {
    folID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
}
);
module.exports = followers;
