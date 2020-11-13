const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const country = connection.define('country', {
    countryID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    country: {
        type: Sequelize.STRING,
    },
    countryAr: {
        type: Sequelize.STRING,
    }

}
);
module.exports = country;
