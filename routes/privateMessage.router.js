const router = require('express').Router();
const privateMsgController = require('../controllers/privateMessages.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', privateMsgController.getAll);
router.post('/', privateMsgController.add);
router.put('/', privateMsgController.update);
router.delete('/', privateMsgController.delete);



module.exports = router;
