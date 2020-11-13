const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.use('/subCategory', require('./subCategory.router'));

router.get('/', passport.authenticate('user', { session: false }), categoryController.getAll);

router.post('/', passport.authenticate('user', { session: false }), categoryController.add);
router.put('/', passport.authenticate('user', { session: false }), categoryController.update);
router.delete('/', passport.authenticate('user', { session: false }), categoryController.delete);




module.exports = router;
