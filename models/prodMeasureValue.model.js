const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const measurementValue = connection.define('prod_meas_value', {
    measurementID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    measurementType: {
        type: Sequelize.STRING,
    },
    measurementTypeAr: {
        type: Sequelize.STRING,
    },
    measurementValue: {
        type: Sequelize.DOUBLE(4, 2),
    }
}
);
module.exports = measurementValue;
