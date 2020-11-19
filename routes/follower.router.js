const router = require('express').Router();
const followersController = require('../controllers/followers.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('user', { session: false }), followersController.getAll);
router.post('/', passport.authenticate('user', { session: false }), followersController.add);
// router.put('/', passport.authenticate('user', { session: false }), followersController.update);
router.delete('/', passport.authenticate('user', { session: false }), followersController.delete);
router.get('/getBy/:followerID', passport.authenticate('user', { session: false }), followersController.getByID);
router.get('/getByUserId/:userId', passport.authenticate('user', { session: false }), followersController.getByID);




module.exports = router;
