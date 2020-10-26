const router = require('express').Router();
const likesController = require('../controllers/likes.controller');
const passport = require('passport');


router.get('/', likesController.getAll);
router.post('/add', likesController.add);



module.exports = router;
