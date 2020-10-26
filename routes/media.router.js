const router = require('express').Router();
const mediaController = require('../controllers/media.controller');
const passport = require('passport');


router.get('/', mediaController.getAll);
router.post('/add', mediaController.add);



module.exports = router;
