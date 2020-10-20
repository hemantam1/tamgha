const router = require('express').Router();
const cityController = require('../controllers/city.controller');

const passport = require('passport');


router.post('/add', cityController.add);
router.post('/update', cityController.update);
router.post('/delete', cityController.delete);
router.get('/getAll', cityController.getAll);
router.get('/:contID', cityController.getByID);


module.exports = router;
