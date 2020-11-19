const router = require('express').Router();
const reciptController = require('../controllers/recipt.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('user', { session: false }), reciptController.getAll);

router.post('/', passport.authenticate('user', { session: false }), reciptController.add);
// router.put('/', reciptController.update);
router.delete('/', passport.authenticate('user', { session: false }), reciptController.delete);
router.get('/getBy/:reciptID', passport.authenticate('user', { session: false }), reciptController.getByID);
router.get('/getBySold', passport.authenticate('user', { session: false }), reciptController.getByID);


module.exports = router;
