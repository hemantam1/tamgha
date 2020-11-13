const router = require('express').Router();
const mediaController = require('../controllers/media.controller');
const passport = require('passport');
const multer = require('../services/multer.service')
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('user', { session: false }), mediaController.getAll);
router.post('/', multer.array('files'), passport.authenticate('user', { session: false }), mediaController.add);
router.put('/', multer.array('files'), passport.authenticate('user', { session: false }), mediaController.update);
router.delete('/', passport.authenticate('user', { session: false }), mediaController.delete);



module.exports = router;
