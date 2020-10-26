const router = require('express').Router();
const countryController = require('../controllers/country.controller');

const passport = require('passport');


router.post('/', countryController.add);
router.put('/', countryController.update);
router.delete('/', countryController.delete);
router.get('/', countryController.getAll);
router.get('/:ctryID', countryController.getByID);




module.exports = router;
