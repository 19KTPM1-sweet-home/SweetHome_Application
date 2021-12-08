const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.get('/', userController.showProfile);

router.post('/edit', userController.editProfile);

router.post('/edit/password', userController.editPassword);
module.exports = router;
