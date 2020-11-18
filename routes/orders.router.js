const router = require('express').Router();
const ordersController = require('../controllers/orders.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('user', { session: false }), ordersController.getAll);
router.post('/', passport.authenticate('user', { session: false }), ordersController.add);
// router.put('/', passport.authenticate('user', { session: false }), ordersController.update);
router.delete('/', passport.authenticate('user', { session: false }), ordersController.delete);
router.get('/:orderID', passport.authenticate('user', { session: false }), ordersController.getByID);


module.exports = router;
