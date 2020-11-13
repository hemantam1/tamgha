const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const city = connection.define('city', {
    cityID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    city: {
        type: Sequelize.STRING
    },
    cityAr: {
        type: Sequelize.STRING
    }

}
);
module.exports = city;
