const router = require('express').Router();
const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');

const passport = require('passport');


// router.get('/upload', function (req, res, next) {
//     res.sendFile(__dirname + '/client/index.html')
// });


router.get('/explore', productController.explore);
router.get('/feed', productController.explore);

// router.get('/feed', addressController.getAll);





module.exports = router;
