const router = require('express').Router();
const countryController = require('../controllers/country.controller');
const { user, admin, guest } = require('../middlewares/auth')

const passport = require('passport');


router.use('/state', require('./goverorate.router'));


router.post('/', countryController.add);
router.put('/', countryController.update);
router.delete('/', countryController.delete);
router.get('/', countryController.getAll);
router.get('/:countryID', countryController.getByID);




module.exports = router;
