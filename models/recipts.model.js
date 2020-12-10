const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const Recipt = connection.define('recipt', {
    reciptID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    type: {
        type: Sequelize.ENUM,
        values: ['buy', 'sell'],
        defaultValue: 'buy'
    },
}
);
module.exports = Recipt;
