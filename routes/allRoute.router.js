const router = require('express').Router();
const userController = require('../controllers/user.controller');
const prDetailController = require('../controllers/prodDetails.controller');

const passport = require('passport');


router.get('/upload', function (req, res, next) {
    res.sendFile(__dirname + '/client/index.html')
});

router.get('/suggest', userController.suggestAll);

router.get('/explore', prDetailController.getAll);

// router.get('/feed', addressController.getAll);





module.exports = router;
