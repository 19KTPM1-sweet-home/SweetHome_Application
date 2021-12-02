const express = require('express');
const router = express.Router();

const propertyController = require('../app/controllers/PropertyController');

router.get('/:slug/:currentPage',propertyController.listByCategory)
module.exports = router;