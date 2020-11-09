const router = require('express').Router();
const followersController = require('../controllers/followers.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', followersController.getAll);
router.post('/', followersController.add);
router.put('/', followersController.update);
router.delete('/', followersController.delete);




module.exports = router;
