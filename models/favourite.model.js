const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const Favourite = connection.define('favourite', {
    favouriteID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
}
);
module.exports = Favourite;
