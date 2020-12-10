const router = require('express').Router();
const mediaController = require('../controllers/media.controller');
const passport = require('passport');
const multer = require('../services/multer.service')


router.get('/', passport.authenticate('user', { session: false }), mediaController.getAll);
router.post('/', mediaController.add);
router.put('/', multer.array('files'), passport.authenticate('user', { session: false }), mediaController.update);
router.delete('/', passport.authenticate('user', { session: false }), mediaController.delete);
router.get('/getBy/:mediaID', passport.authenticate('user', { session: false }), mediaController.getByID);
router.get('/getByProductId/:product_id', passport.authenticate('user', { session: false }), mediaController.getByID);


module.exports = router;
