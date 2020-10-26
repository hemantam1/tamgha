const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const measurementValue = connection.define('prod_meas_value', {
    msvID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    measureType: {
        type: Sequelize.STRING,
    },
    measureTypeAr: {
        type: Sequelize.STRING,
    },
    measureValue: {
        type: Sequelize.DOUBLE,
    }
}
);
module.exports = measurementValue;
