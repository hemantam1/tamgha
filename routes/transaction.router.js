const router = require('express').Router();
const transactionController = require('../controllers/transaction.controller');
const passport = require('passport');


router.get('/', transactionController.getAll);

router.post('/', transactionController.add);
router.put('/', transactionController.update);
router.delete('/', transactionController.delete);



module.exports = router;
