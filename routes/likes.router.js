const router = require('express').Router();
const likesController = require('../controllers/likes.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', likesController.getAll);
router.post('/', likesController.add);
router.put('/', likesController.update);
router.delete('/', likesController.delete);



module.exports = router;
