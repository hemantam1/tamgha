const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const orders = connection.define('orders', {
    orderID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    deliveryMethod: {
        type: Sequelize.STRING,
    },
    paymentMethod: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.ENUM,
        values: ['succes', 'pending', 'cancel']
    },
    orderCurrency: {
        type: Sequelize.STRING,
    },
    orderCurrencyAr: {
        type: Sequelize.STRING,
    },
    orderPrice: {
        type: Sequelize.DOUBLE(8, 2),
    },
    orderQuantity: {
        type: Sequelize.INTEGER,
    }
}
);
module.exports = orders;
