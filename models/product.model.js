const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const product = connection.define('product', {
    prodID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    prodName: {
        type: Sequelize.STRING,
    },
    prodNameAr: {
        type: Sequelize.STRING,
    },
    prodDescription: {
        type: Sequelize.STRING,
    },
    prodDescriptionAr: {
        type: Sequelize.STRING,
    },
    prodCategory: {
        type: Sequelize.ENUM,
        values: ['Men', 'Women']
    },
}
);
module.exports = product;
