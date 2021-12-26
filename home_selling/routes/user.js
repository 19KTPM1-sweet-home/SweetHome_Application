const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const loggedInUserGuard = require('../app/middlewares/loggedInUserGuard');
const multer = require('multer');

// ----------SETUP MULTER------------
const maxfileSize = 20000000 // 20MB
const storage = multer.memoryStorage()
const upload = multer({ 
  storage: storage,
  limits: { fileSize: maxfileSize }
});

router.get('/profile', loggedInUserGuard, userController.showProfile);

router.post('/profile/edit', upload.fields([{ name: 'avatar', maxCount: 1 }]), userController.editProfile);

router.post('/profile/edit/password', userController.editPassword);

router.get('/favourite-list',userController.showFavoriteList);
module.exports = router;
