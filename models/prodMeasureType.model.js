const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const measurementType = connection.define('prod_meas_type', {
    msrID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    value: {
        type: Sequelize.STRING,
    },
    valueAr: {
        type: Sequelize.STRING,
    }
}
);
module.exports = measurementType;
