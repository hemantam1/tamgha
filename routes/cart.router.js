const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('user', { session: false }), cartController.getAll);
router.post('/', passport.authenticate('user', { session: false }), cartController.add);
router.put('/', passport.authenticate('user', { session: false }), cartController.update);
router.delete('/', passport.authenticate('user', { session: false }), cartController.delete);
router.get('/:cartID', passport.authenticate('user', { session: false }), cartController.getByID);



module.exports = router;
