const router = require('express').Router();
const countryController = require('../controllers/country.controller');

const passport = require('passport');


router.post('/add', countryController.add);
router.post('/update', countryController.update);
router.post('/delete', countryController.delete);
router.get('/getAll', countryController.getAll);
router.get('/:ctryID', countryController.getByID);




module.exports = router;
