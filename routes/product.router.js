const router = require('express').Router();
const productController = require('../controllers/product.controller');
const passport = require('passport');
var multer = require('multer')
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })


router.get('/', productController.getAll);
router.post('/upload', productController.upload);
router.post('/', productController.add);
router.put('/', productController.update);
router.delete('/', productController.delete);
router.post('/photos/upload', upload.array('photos', 12), productController.uploadPhotos);


router.use('/category', require('./category.router'));
router.use('/subCategory', require('./subCategory.router'));
router.use('/media', require('./media.router'));
router.use('/sizeType', require('./productMeasureType.router'));

router.use('/productDetail', require('./prodDetails.router'));
router.use('/shippingAddress', require('./shippingAddress.router'));
router.use('/comment', require('./comment.router'));
router.use('/like', require('./likes.router'));

// router.get('/comment', productController.add);
// router.post('/comment/add', productController.add);



// app.post('/photos',)

module.exports = router;
