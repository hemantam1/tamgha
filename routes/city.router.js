const router = require('express').Router();
const cityController = require('../controllers/city.controller');

const passport = require('passport');


router.post('/add', cityController.add);
router.put('/update', cityController.update);
router.delete('/delete', cityController.delete);
router.get('/', cityController.getAll);
router.get('/:contID', cityController.getByID);


module.exports = router;
