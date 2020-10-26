const router = require('express').Router();
const shippingAddressController = require('../controllers/shippingAddress.controller');
const passport = require('passport');


router.get('/', shippingAddressController.getAll);
router.get('/add', shippingAddressController.add);




module.exports = router;
