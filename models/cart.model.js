const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const Cart = connection.define('cart', {
    cartID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: Sequelize.DOUBLE,
    }
}
);
module.exports = Cart;
