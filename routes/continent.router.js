const router = require('express').Router();
const continentController = require('../controllers/continent.controller');

const passport = require('passport');


router.post('/add', continentController.add);
router.post('/update', continentController.update);
router.post('/delete', continentController.delete);
router.get('/getAll', continentController.getAll);
router.get('/:contID', continentController.getByID);


module.exports = router;
