const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const orders = connection.define('orders', {
    ordID: {
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
    ordCurrency: {
        type: Sequelize.STRING,
    },
    ordCurrencyAr: {
        type: Sequelize.STRING,
    },
    ordPrice: {
        type: Sequelize.DOUBLE(8, 2),
    },
    ordQuantity: {
        type: Sequelize.INTEGER,
    }
}
);
module.exports = orders;
