const router = require('express').Router();
const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');

const passport = require('passport');



router.get('/explore', passport.authenticate('jwt', { session: false }), productController.explore);

// router.get('/feed', addressController.getAll);





module.exports = router;
