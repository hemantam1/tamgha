const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const Recipt = connection.define('recipt', {
    recpID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    recpType: {
        type: Sequelize.ENUM,
        values: ['Sold', 'Purchased']
    },
}
);
module.exports = Recipt;
