const router = require('express').Router();
const subCategoryController = require('../controllers/subCategory.controller');
const passport = require('passport');
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', passport.authenticate('user', { session: false }), subCategoryController.getAll);
router.post('/', passport.authenticate('user', { session: false }), subCategoryController.add);
router.put('/', passport.authenticate('user', { session: false }), subCategoryController.update);
router.delete('/', passport.authenticate('user', { session: false }), subCategoryController.delete);
router.get('/:subCategoryID', passport.authenticate('user', { session: false }), subCategoryController.getByID);



module.exports = router;
