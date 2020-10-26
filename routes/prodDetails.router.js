const router = require('express').Router();
const prDetailController = require('../controllers/prodDetails.controller');
const passport = require('passport');


router.get('/', prDetailController.getAll);
router.post('/add', prDetailController.add);



module.exports = router;
