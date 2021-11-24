const express = require('express');
const router = express.Router();

const listController = require('../app/controllers/ListController');


router.get('/', listController.show);

module.exports = router;