const router = require('express').Router();
const mediaController = require('../controllers/media.controller');
const passport = require('passport');


router.get('/', mediaController.getAll);
router.post('/', mediaController.add);
router.put('/', mediaController.update);
router.delete('/', mediaController.delete);



module.exports = router;
