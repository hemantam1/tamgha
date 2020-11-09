const router = require('express').Router();
const prDetailController = require('../controllers/prodDetails.controller');
const passport = require('passport');

router.use('/measurement', require('./prodMeasureValue.router'));

router.get('/', prDetailController.getAll);
router.post('/', prDetailController.add);
router.put('/', prDetailController.update);
router.delete('/', prDetailController.delete);



module.exports = router;
