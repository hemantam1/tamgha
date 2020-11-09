const router = require('express').Router();
const reciptController = require('../controllers/recipt.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', reciptController.getAll);

router.post('/', reciptController.add);
router.put('/', reciptController.update);
router.delete('/', reciptController.delete);



module.exports = router;
