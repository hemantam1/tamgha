const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const passport = require('passport');


router.get('/', categoryController.getAll);

router.post('/', categoryController.add);
router.put('/', categoryController.update);
router.delete('/', categoryController.delete);




module.exports = router;
