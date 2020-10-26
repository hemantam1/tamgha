const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const passport = require('passport');


router.get('/', commentController.getAll);
router.post('/', commentController.add);
router.put('/', commentController.update);
router.delete('/', commentController.delete);



module.exports = router;
