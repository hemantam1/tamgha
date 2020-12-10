const router = require('express').Router();
const usrCategoryController = require('../controllers/usrCategory.controller');
const passport = require('passport');


router.get('/', passport.authenticate('user', { session: false }), usrCategoryController.getAll);
router.post('/', passport.authenticate('user', { session: false }), usrCategoryController.add);
router.put('/', passport.authenticate('user', { session: false }), usrCategoryController.update);
router.delete('/', passport.authenticate('user', { session: false }), usrCategoryController.delete);
router.get('/getBy/:userCategoryID', passport.authenticate('user', { session: false }), usrCategoryController.getByID);
router.get('/:self', passport.authenticate('user', { session: false }), usrCategoryController.getByID);



module.exports = router;
