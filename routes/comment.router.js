const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('user', { session: false }), commentController.getAll);
router.post('/', passport.authenticate('user', { session: false }), commentController.add);
router.put('/', passport.authenticate('user', { session: false }), commentController.update);
router.delete('/', passport.authenticate('user', { session: false }), commentController.delete);



module.exports = router;
