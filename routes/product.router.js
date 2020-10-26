const router = require('express').Router();
const productController = require('../controllers/product.controller');
const passport = require('passport');


router.get('/', productController.getAll);
router.post('/', productController.add);
router.put('/', productController.update);
router.delete('/', productController.delete);

// router.get('/comment', productController.add);
// router.post('/comment/add', productController.add);



module.exports = router;
