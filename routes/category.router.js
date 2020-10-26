const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const passport = require('passport');


router.get('/', categoryController.getAll);

router.post('/add', categoryController.add);



module.exports = router;
