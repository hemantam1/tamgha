const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const media = connection.define('prod_media', {
    mediaID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    mediaType: {
        type: Sequelize.ENUM,
        values: ['Image', 'Video'],
        defaultValue: 'Image'
    },
    mediaLink: {
        type: Sequelize.TEXT,
    }
}
);
module.exports = media;
