const router = require('express').Router();
const reciptController = require('../controllers/recipt.controller');
const passport = require('passport');


router.get('/', reciptController.getAll);

// router.post('/add', productController.add);



module.exports = router;
