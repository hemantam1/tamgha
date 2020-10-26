const router = require('express').Router();
const subCategoryController = require('../controllers/subCategory.controller');
const passport = require('passport');


router.get('/', subCategoryController.getAll);
router.post('/', subCategoryController.add);



module.exports = router;
