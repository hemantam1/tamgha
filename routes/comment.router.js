const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const passport = require('passport');


router.get('/', passport.authenticate('user', { session: false }), commentController.getAll);
router.post('/', passport.authenticate('user', { session: false }), commentController.add);
router.put('/', passport.authenticate('user', { session: false }), commentController.update);
router.delete('/', passport.authenticate('user', { session: false }), commentController.delete);
router.get('/getBy/:commentID', passport.authenticate('user', { session: false }), commentController.getByID);
router.get('/getByProductId/:productId', passport.authenticate('user', { session: false }), commentController.getByID);



module.exports = router;
