const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const multer = require('multer');

// ----------SETUP MULTER------------
const maxfileSize = 20000000 // 20MB
const storage = multer.memoryStorage()
const upload = multer({ 
  storage: storage,
  limits: { fileSize: maxfileSize }
});

router.get('/', userController.showProfile);

router.post('/edit', upload.fields([{ name: 'avatar', maxCount: 1 }]), userController.editProfile);

router.post('/edit/password', userController.editPassword);
module.exports = router;
