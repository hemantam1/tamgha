const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const state = connection.define('state', {
    stateID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    state: {
        type: Sequelize.STRING
    },
    stateAr: {
        type: Sequelize.STRING
    }

}
);
module.exports = state;
