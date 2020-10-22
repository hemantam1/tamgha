const router = require('express').Router();
const productController = require('../controllers/product.controller');
const passport = require('passport');


router.get('/', productController.getAll);
// router.post('/add', productController.add);



module.exports = router;
