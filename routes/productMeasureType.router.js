const router = require('express').Router();
const productMTypController = require('../controllers/productMeasureType.controller');
const passport = require('passport');


router.get('/', productMTypController.getAll);
router.post('/', productMTypController.add);



module.exports = router;
