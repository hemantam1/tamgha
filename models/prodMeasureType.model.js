const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const measurementType = connection.define('prod_meas_type', {
    typeID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
    },
    typeAr: {
        type: Sequelize.STRING,
    }
}
);
module.exports = measurementType;
