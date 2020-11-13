const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const media = connection.define('prod_media', {
    mediaID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    url: {
        type: Sequelize.TEXT,
    },
    ext: {
        type: Sequelize.STRING,
    },
    format: {
        type: Sequelize.STRING,
    }
}
);
module.exports = media;
