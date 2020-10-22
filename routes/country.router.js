const router = require('express').Router();
const countryController = require('../controllers/country.controller');

const passport = require('passport');


router.post('/add', countryController.add);
router.put('/update', countryController.update);
router.delete('/delete', countryController.delete);
router.get('/', countryController.getAll);
router.get('/:ctryID', countryController.getByID);




module.exports = router;
