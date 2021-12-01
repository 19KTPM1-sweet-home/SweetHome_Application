const express = require('express');
const router = express.Router();

const listController = require('../app/controllers/ListController');

router.get('/categories/all', listController.show);
router.get('/categories/:slug', listController.listProperties);
router.get('/categories', listController.show);

module.exports = router;
