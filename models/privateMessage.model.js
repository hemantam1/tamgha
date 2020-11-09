const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const PrivateMessage = connection.define('private_messages', {
    messageID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    message: {
        type: Sequelize.TEXT,
    }
}
);
module.exports = PrivateMessage;
