const router = require('express').Router();
const media = require('../controllers/media.controller');
const passport = require('passport');


router.get('/', media.getAll);
// router.post('/add', productController.add);



module.exports = router;
