const router = require('express').Router();
const shipDetailController = require('../controllers/shippingDetails.controller');
const passport = require('passport');


router.get('/', passport.authenticate('admin', { session: false }), shipDetailController.getAll);
router.post('/', passport.authenticate('admin', { session: false }), shipDetailController.add);
router.put('/', passport.authenticate('admin', { session: false }), shipDetailController.update);
router.delete('/', passport.authenticate('admin', { session: false }), shipDetailController.delete);
router.get('/getBy/:shipID', passport.authenticate('user', { session: false }), shipDetailController.getByID);



module.exports = router;
