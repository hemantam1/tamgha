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
    priceCurrency: {
        type: Sequelize.STRING,
    },
    priceCurrencyAr: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DOUBLE(8, 2),
    }
}
);
module.exports = Cart;
