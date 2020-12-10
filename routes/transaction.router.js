const router = require('express').Router();
const transactionController = require('../controllers/transaction.controller');
const passport = require('passport');


router.get('/', passport.authenticate('user', { session: false }), transactionController.getAll);

router.post('/', passport.authenticate('user', { session: false }), transactionController.add);
// router.put('/', transactionController.update);
router.delete('/', passport.authenticate('user', { session: false }), transactionController.delete);
router.get('/getBy/:transactionID', passport.authenticate('user', { session: false }), transactionController.getByID);



module.exports = router;
