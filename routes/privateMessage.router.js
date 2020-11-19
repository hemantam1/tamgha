const router = require('express').Router();
const privateMsgController = require('../controllers/privateMessages.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('user', { session: false }), privateMsgController.getAll);
router.post('/', passport.authenticate('user', { session: false }), privateMsgController.add);
// router.put('/', passport.authenticate('user', { session: false }), privateMsgController.update);
router.delete('/', passport.authenticate('user', { session: false }), privateMsgController.delete);
router.get('/getBy/:messageID', passport.authenticate('user', { session: false }), privateMsgController.getByID);
router.get('/getByUserId/:to_user_id', passport.authenticate('user', { session: false }), privateMsgController.getByID);


module.exports = router;
