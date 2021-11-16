const express = require('express');
const router = express.Router();

const signupController = require('../app/controllers/SignupController.js');

router.get('/', signupController.show);

module.exports = router;