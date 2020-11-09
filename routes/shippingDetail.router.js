const router = require('express').Router();
const shipDetailController = require('../controllers/shippingDetails.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', shipDetailController.getAll);
router.post('/', shipDetailController.add);
router.put('/', shipDetailController.update);
router.delete('/', shipDetailController.delete);



module.exports = router;
