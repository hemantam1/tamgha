const router = require('express').Router();
const ordersController = require('../controllers/orders.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', ordersController.getAll);
router.post('/', ordersController.add);
router.put('/', ordersController.update);
router.delete('/', ordersController.delete);



module.exports = router;
