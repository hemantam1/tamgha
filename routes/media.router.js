const router = require('express').Router();
const mediaController = require('../controllers/media.controller');
const passport = require('passport');
const multer = require('../services/multer.service')
const { user, admin, guest } = require('../middlewares/auth')


router.get('/', mediaController.getAll);
router.post('/', multer.array('files'), mediaController.add);
router.put('/', multer.array('files'), mediaController.update);
router.delete('/', mediaController.delete);



module.exports = router;
