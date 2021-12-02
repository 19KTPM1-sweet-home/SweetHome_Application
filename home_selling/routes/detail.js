const express = require('express');
const router = express.Router();

const propertyController = require('../app/controllers/PropertyController');

router.get('/:slug', propertyController.show);

module.exports = router;
