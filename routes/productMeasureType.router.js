const router = require('express').Router();
const productMTypController = require('../controllers/productMeasureType.controller');
const passport = require('passport');


router.get('/', passport.authenticate('user', { session: false }), productMTypController.getAll);
router.post('/', passport.authenticate('user', { session: false }), productMTypController.add);
router.put('/', passport.authenticate('user', { session: false }), productMTypController.update);
router.delete('/', passport.authenticate('user', { session: false }), productMTypController.delete);
router.get('/getBy/:typeID', passport.authenticate('user', { session: false }), productMTypController.getByID);
router.get('/getByProductId/:productId', passport.authenticate('user', { session: false }), productMTypController.getByID);



module.exports = router;
