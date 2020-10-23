const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const Cart = connection.define('cart', {
    cartID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
);
module.exports = Cart;
