const router = require('express').Router();
const suggectController = require('../controllers/user.controller');
const passport = require('passport');


router.get('/', suggectController.getAll);
// router.post('/add', productController.add);
// router.get('/comment', productController.add);
// router.post('/comment/add', productController.add);



module.exports = router;
