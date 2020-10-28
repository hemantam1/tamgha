const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require('morgan');
const config = require('./config');
const sequelize = require('./services/sequelize.service');
const { authenticate } = require('passport');

app.use(cors());
app.use(morgan(':method :url'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
sequelize.connect();
require('./models/associations');
require('./services/passport.service').initialize();

app.use('/', require('./routes/allRoute.router'));
app.use('/category', require('./routes/category.router'));
app.use('/city', require('./routes/city.router'));
app.use('/comment', require('./routes/comment.router'));
app.use('/country', require('./routes/country.router'));
app.use('/deliveryAddress', require('./routes/deliveryAddress.router'));
app.use('/follower', require('./routes/follower.router'));
app.use('/like', require('./routes/likes.router'));
app.use('/media', require('./routes/media.router'));
app.use('/order', require('./routes/orders.router'));
app.use('/privateMessage', require('./routes/privateMessage.router'));
app.use('/productDetail', require('./routes/prodDetails.router'));
app.use('/size', require('./routes/prodMeasureValue.router'));
app.use('/product', require('./routes/product.router'));
app.use('/sizeType', require('./routes/productMeasureType.router'));
app.use('/recipt', require('./routes/recipt.router'));
app.use('/shippingAddress', require('./routes/shippingAddress.router'));
app.use('/subCategory', require('./routes/subCategory.router'));
app.use('/transaction', require('./routes/transaction.router'));
app.use('/user', require('./routes/user.router'));
app.use('/cart', require('./routes/cart.router'));
app.use('/favourite', require('./routes/favourite.router'));
app.use('/usrCategory', require('./routes/userCategory.router'));
app.use('/tamghaShip', require('./routes/shippingDetail.router'));



sequelize.connection()
    .authenticate()
    .then(() => {
        return sequelize.connection().sync({ force: false });
    })
    .then((e) => {
        app.listen(config.port, (err) => {
            if (err) throw err;
            else console.log("\x1b[32m%s\x1b[0m", 'listening on: http://localhost:' + config.port);
        });
    })
    .catch(err => console.error(err));


module.exports = app;
