const router = require('express').Router();
const cityController = require('../controllers/city.controller');

const passport = require('passport');


router.post('/', passport.authenticate('user', { session: false }), cityController.add);
router.put('/', passport.authenticate('user', { session: false }), cityController.update);
router.delete('/', passport.authenticate('user', { session: false }), cityController.delete);
router.get('/', passport.authenticate('user', { session: false }), cityController.getAll);
router.get('/getBy/:cityID', passport.authenticate('user', { session: false }), cityController.getByID);


module.exports = router;
