const router = require('express').Router();
const productController = require('../controllers/product.controller');
const passport = require('passport');
const multer = require('../services/multer.service');

// var multer = require('multer')
// // SET STORAGE
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'temp/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// var upload = multer({ storage: storage })
// router.post('/photos/upload', upload.array('photos', 12), productController.uploadPhotos);


router.get('/', passport.authenticate('user', { session: false }), productController.getAll);
// router.post('/upload', multer.array("files"), passport.authenticate('user', { session: false }), productController.upload);
router.post('/', passport.authenticate('user', { session: false }), productController.add);
router.put('/', passport.authenticate('user', { session: false }), productController.update);
router.delete('/', passport.authenticate('user', { session: false }), productController.delete);
router.get('/getBy/:productID', passport.authenticate('user', { session: false }), productController.getByID);


router.use('/category', require('./category.router'));
router.use('/subCategory', require('./subCategory.router'));
router.use('/media', require('./media.router'));
router.use('/measurementType', require('./productMeasureType.router'));

router.use('/detail', require('./prodDetails.router'));
router.use('/shippingAddress', require('./shippingAddress.router'));
router.use('/comment', require('./comment.router'));
router.use('/like', require('./likes.router'));


module.exports = router;
