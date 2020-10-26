const router = require('express').Router();
const deliveryAddressController = require('../controllers/deliveryAddress.controller');
const passport = require('passport');



router.get('/', deliveryAddressController.getAll);

router.post('/add', deliveryAddressController.add);



module.exports = router;
