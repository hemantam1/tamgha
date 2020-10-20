const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const city = connection.define('city', {
    citID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    citName: {
        type: Sequelize.STRING,
        unique: true
    },
    citNameAr: {
        type: Sequelize.STRING,
        unique: true
    }

}
);
module.exports = city;
