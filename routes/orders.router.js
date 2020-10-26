const router = require('express').Router();
const ordersController = require('../controllers/orders.controller');
const passport = require('passport');


router.get('/', ordersController.getAll);
router.post('/add', ordersController.add);



module.exports = router;
