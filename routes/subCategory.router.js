const router = require('express').Router();
const subCategoryController = require('../controllers/subCategory.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', subCategoryController.getAll);
router.post('/', subCategoryController.add);
router.put('/', subCategoryController.update);
router.delete('/', subCategoryController.delete);



module.exports = router;
