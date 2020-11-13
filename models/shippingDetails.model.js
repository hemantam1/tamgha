const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const ShipingDetail = connection.define('ship_details', {
    shipID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    weight: {
        type: Sequelize.DOUBLE(4, 2),
    },
    currency: {
        type: Sequelize.STRING,
    },
    currencyAr: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DOUBLE(6, 2),
    }
}
);
module.exports = ShipingDetail;
