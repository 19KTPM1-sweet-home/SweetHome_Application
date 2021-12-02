const express = require('express');
const router = express.Router();

const listController = require('../app/controllers/ListController');
router.get('/categories/:slug', listController.listProperties);
module.exports = router;
