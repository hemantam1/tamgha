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

app.use('/user', require('./routes/user.router'));
app.use('/country', require('./routes/country.router'));
app.use('/city', require('./routes/city.router'));
app.use('/product', require('./routes/product.router'));



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
