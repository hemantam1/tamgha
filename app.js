const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require('morgan');
const config = require('./config');
const sequelize = require('./services/sequelize.service');
const { authenticate } = require('passport');
const logger = require('./utils/loging.js')
const helmet = require("helmet");

app.use(cors());
app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
sequelize.connect();
require('./models/associations');
require('./services/passport.service').initialize();

// app.use(logger.log);
app.use(
    helmet({
        referrerPolicy: { policy: "no-referrer" },
        contentSecurityPolicy: false,
        frameguard: {
            action: "deny",
        },

    })
);
app.use('/', require('./routes/allRoute.router'));
app.use('/country', require('./routes/country.router'));
app.use('/state', require('./routes/goverorate.router'));
app.use('/city', require('./routes/city.router'));
app.use('/userCategory', require('./routes/userCategory.router'));
app.use('/user', require('./routes/user.router'));
app.use('/product', require('./routes/product.router'));
app.use('/tamghaShip', require('./routes/shippingDetail.router'));

app.use(logger.error);


sequelize.connection()
    .authenticate()
    .then(() => {
        return sequelize.connection().sync({ force: true });
    })
    .then((e) => {
        app.listen(config.port, (err) => {
            if (err) throw err;
            else console.log("\x1b[32m%s\x1b[0m", 'listening on: http://localhost:' + config.port);
        });
    })
    .catch(err => console.error(err));


module.exports = app;
