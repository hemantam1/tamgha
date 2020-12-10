const router = require('express').Router();
const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');

const passport = require('passport');



router.get('/explore', passport.authenticate('user', { session: false }), productController.explore);
router.get('/users', passport.authenticate('user', { session: false }), userController.suggestAll)
// router.get('/feed', addressController.getAll);





module.exports = router;
