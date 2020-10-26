const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const Comments = connection.define('coments', {
    comID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    comment: {
        type: Sequelize.STRING,
    },
    commentAr: {
        type: Sequelize.STRING,
    }
}
);
module.exports = Comments;
