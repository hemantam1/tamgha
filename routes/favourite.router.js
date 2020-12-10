const router = require('express').Router();
const favouriteController = require('../controllers/favourite.controller');
const passport = require('passport');


router.get('/', passport.authenticate('user', { session: false }), favouriteController.getAll);
router.post('/', passport.authenticate('user', { session: false }), favouriteController.add);
// router.put('/', passport.authenticate('user', { session: false }), favouriteController.update);
router.delete('/', passport.authenticate('user', { session: false }), favouriteController.delete);
router.get('/getBy/:favouriteID', passport.authenticate('user', { session: false }), favouriteController.getByID);
router.get('/getByProductId/:productId', passport.authenticate('user', { session: false }), favouriteController.getByID);



module.exports = router;
