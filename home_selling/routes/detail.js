const express = require('express');
const router = express.Router();
const loggedInUserGuard = require('../app/middlewares/loggedInUserGuard');

const propertyController = require('../app/controllers/PropertyController');

router.get('/:slug', propertyController.show);

router.get('/:slug/comments/:page', propertyController.loadCommentPerPage);

router.post('/:slug/comments', propertyController.postComment);

module.exports = router;
