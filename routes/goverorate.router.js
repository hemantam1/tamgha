



const router = require('express').Router();
const governorateController = require('../controllers/governorate.controller');

const passport = require('passport');

router.use('/city', require('./city.router'));

router.post('/', governorateController.add);
router.put('/', governorateController.update);
router.delete('/', governorateController.delete);
router.get('/', governorateController.getAll);
router.get('/:stateID', governorateController.getByID);


module.exports = router;


