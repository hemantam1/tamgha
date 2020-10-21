const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const measurementType = connection.define('prod_measureType', {
    msrID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    msrValue: {
        type: Sequelize.STRING,
    },
    msrValueAr: {
        type: Sequelize.STRING,
    }
}
);
module.exports = measurementType;
