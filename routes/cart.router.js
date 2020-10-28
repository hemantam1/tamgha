const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const passport = require('passport');


router.get('/', cartController.getAll);
router.post('/', cartController.add);
router.put('/', cartController.update);
router.delete('/', cartController.delete);



module.exports = router;
