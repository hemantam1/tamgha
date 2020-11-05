const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const State = connection.define('state', {
    stateID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    state: {
        type: Sequelize.STRING,
        unique: true
    },
    stateAr: {
        type: Sequelize.STRING,
        unique: true
    }
}
);
module.exports = State;
