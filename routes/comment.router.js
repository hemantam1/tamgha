const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const passport = require('passport');


router.get('/', commentController.getAll);
router.post('/', commentController.add);



module.exports = router;
