



const router = require('express').Router();
const governorateController = require('../controllers/governorate.controller');
const { user, admin, guest } = require('../middlewares/auth')

const passport = require('passport');


router.post('/', passport.authenticate('user', { session: false }), governorateController.add);
router.put('/', passport.authenticate('user', { session: false }), governorateController.update);
router.delete('/', passport.authenticate('user', { session: false }), governorateController.delete);
router.get('/', passport.authenticate('user', { session: false }), governorateController.getAll);
router.get('/getBy/:stateID', passport.authenticate('user', { session: false }), governorateController.getByID);


module.exports = router;


