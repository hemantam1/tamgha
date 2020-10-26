const router = require('express').Router();
const deliveryAddressController = require('../controllers/deliveryAddress.controller');
const passport = require('passport');



router.get('/', deliveryAddressController.getAll);

router.post('/', deliveryAddressController.add);
router.put('/', deliveryAddressController.update);
router.delete('/', deliveryAddressController.delete);



module.exports = router;
