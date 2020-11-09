const router = require('express').Router();
const usrCategoryController = require('../controllers/usrCategory.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', usrCategoryController.getAll);
router.post('/', usrCategoryController.add);
router.put('/', usrCategoryController.update);
router.delete('/', usrCategoryController.delete);



module.exports = router;
