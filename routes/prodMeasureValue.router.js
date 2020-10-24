const router = require('express').Router();
const productMVController = require('../controllers/prodMeasureValue.controller');
const passport = require('passport');


router.get('/', productMVController.getAll);
// router.post('/add', productController.add);



module.exports = router;
