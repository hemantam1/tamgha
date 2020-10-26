const router = require('express').Router();
const followersController = require('../controllers/followers.controller');
const passport = require('passport');


router.get('/', followersController.getAll);
router.post('/add', followersController.add);



module.exports = router;
