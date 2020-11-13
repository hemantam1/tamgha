const router = require('express').Router();
const usrCategoryController = require('../controllers/usrCategory.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('user', { session: false }), usrCategoryController.getAll);
router.post('/', passport.authenticate('user', { session: false }), usrCategoryController.add);
router.put('/', passport.authenticate('user', { session: false }), usrCategoryController.update);
router.delete('/', passport.authenticate('user', { session: false }), usrCategoryController.delete);



module.exports = router;
