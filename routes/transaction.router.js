const router = require('express').Router();
const transactionController = require('../controllers/transaction.controller');
const passport = require('passport');


router.get('/', transactionController.getAll);

router.post('/add', transactionController.add);



module.exports = router;
