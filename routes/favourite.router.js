const router = require('express').Router();
const favouriteController = require('../controllers/favourite.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('user', { session: false }), favouriteController.getAll);
router.post('/', passport.authenticate('user', { session: false }), favouriteController.add);
// router.put('/', passport.authenticate('user', { session: false }), favouriteController.update);
router.delete('/', passport.authenticate('user', { session: false }), favouriteController.delete);



module.exports = router;
