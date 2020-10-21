const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const measurementValue = connection.define('prod_measureValue', {
    msvID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    msvMeasureType: {
        type: Sequelize.STRING,
    },
    msvMeasureTypeAr: {
        type: Sequelize.STRING,
    },
    msvMeasureValue: {
        type: Sequelize.STRING,
    }
}
);
module.exports = measurementValue;
