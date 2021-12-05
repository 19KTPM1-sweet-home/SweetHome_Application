const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');
const loginController = require('../app/controllers/LoginController');

router.get('/', loginController.show);

router.post('/login', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/wrong-password' 
}));

module.exports = router;
