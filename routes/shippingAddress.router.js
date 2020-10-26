const router = require('express').Router();
const shippingAddressController = require('../controllers/shippingAddress.controller');
const passport = require('passport');


router.get('/', shippingAddressController.getAll);
router.post('/', shippingAddressController.add);
router.put('/', shippingAddressController.update);
router.delete('/', shippingAddressController.delete);




module.exports = router;
