const router = require('express').Router();
const ordersController = require('../controllers/orders.controller');
const passport = require('passport');


router.get('/', passport.authenticate('user', { session: false }), ordersController.getAll);
router.get('/', passport.authenticate('admin', { session: false }), ordersController.getAll);

router.post('/', passport.authenticate('user', { session: false }), ordersController.add);
// router.put('/', passport.authenticate('user', { session: false }), ordersController.update);
router.delete('/', passport.authenticate('user', { session: false }), ordersController.delete);
router.get('/getBy/:orderID', passport.authenticate('user', { session: false }), ordersController.getByID);
router.get('/getByProductId/:product_id', passport.authenticate('user', { session: false }), ordersController.getByID);


module.exports = router;
