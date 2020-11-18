const router = require('express').Router();
const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');
const { user, admin, guest } = require('../middlewares/auth')

const passport = require('passport');


router.use('/cart', require('./cart.router'));
router.use('/favourite', require('./favourite.router'));
router.use('/privateMessage', require('./privateMessage.router'));
router.use('/transaction', require('./transaction.router'));
router.use('/category', require('./userCategory.router'));

router.use('/deliveryAddress', require('./deliveryAddress.router'));
router.use('/follower', require('./follower.router'));
router.use('/library', require('./media.router'));
router.use('/order', require('./orders.router'));
router.use('/recipt', require('./recipt.router'));

router.get('/feed', passport.authenticate('user', { session: false }), productController.explore);
router.post('/signUp', userController.register);
router.post('/signIn', userController.login);

// router.post('/details', userController.detail);
// router.post('/products', userController.detail);


//update user profile
// router.get('/test', passport.authenticate('jwt', { session: false }), userController.test);


module.exports = router;
