const router = require('express').Router();
const cityController = require('../controllers/city.controller');

const passport = require('passport');


router.post('/', cityController.add);
router.put('/', cityController.update);
router.delete('/', cityController.delete);
router.get('/', cityController.getAll);
router.get('/:cityID', cityController.getByID);


module.exports = router;
