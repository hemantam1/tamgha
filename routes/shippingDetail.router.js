const router = require('express').Router();
const shipDetailController = require('../controllers/shippingDetails.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('admin', { session: false }), shipDetailController.getAll);
router.post('/', passport.authenticate('admin', { session: false }), shipDetailController.add);
router.put('/', passport.authenticate('admin', { session: false }), shipDetailController.update);
router.delete('/', passport.authenticate('admin', { session: false }), shipDetailController.delete);



module.exports = router;
