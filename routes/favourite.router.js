const router = require('express').Router();
const favouriteController = require('../controllers/favourite.controller');
const passport = require('passport');


router.get('/', favouriteController.getAll);
router.post('/', favouriteController.add);
router.put('/', favouriteController.update);
router.delete('/', favouriteController.delete);



module.exports = router;
