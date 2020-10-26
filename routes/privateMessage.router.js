const router = require('express').Router();
const privateMsgController = require('../controllers/privateMessages.controller');
const passport = require('passport');


router.get('/', privateMsgController.getAll);
router.post('/', privateMsgController.add);
router.put('/', privateMsgController.update);
router.delete('/', privateMsgController.delete);



module.exports = router;
