const router = require('express').Router();
const userController = require('../controllers/user.controller');
const passport = require('passport');


router.post('/signUp', userController.register);
router.post('/signIn', userController.login);

// router.post('/details', userController.detail);
// router.post('/products', userController.detail);


//update user profile
// router.get('/test', passport.authenticate('jwt', { session: false }), userController.test);


module.exports = router;
