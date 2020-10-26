const router = require('express').Router();
const productController = require('../controllers/product.controller');
const passport = require('passport');


router.get('/', productController.getAll);
router.post('/add', productController.add);
// router.get('/comment', productController.add);
// router.post('/comment/add', productController.add);



module.exports = router;
