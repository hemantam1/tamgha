const router = require('express').Router();
const deliveryAddressController = require('../controllers/deliveryAddress.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')



router.get('/', passport.authenticate('user', { session: false }), deliveryAddressController.getAll);

router.post('/', passport.authenticate('user', { session: false }), deliveryAddressController.add);
router.put('/', passport.authenticate('user', { session: false }), deliveryAddressController.update);
router.delete('/', passport.authenticate('user', { session: false }), deliveryAddressController.delete);
router.get('/getBy/:addressID', passport.authenticate('user', { session: false }), deliveryAddressController.getByID);



module.exports = router;
