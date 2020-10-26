const router = require('express').Router();
const productMVController = require('../controllers/prodMeasureValue.controller');
const passport = require('passport');


router.get('/', productMVController.getAll);
router.post('/', productMVController.add);
router.put('/', productMVController.update);
router.delete('/', productMVController.delete);



module.exports = router;
