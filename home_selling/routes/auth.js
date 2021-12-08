const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');
const authController = require('../app/controllers/authController');

router.get('/login', authController.showLogin);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login/?wrong-password',
    failureFlash: true
}));


router.get('/signup', authController.showSignup);
router.post('/signup', authController.createUser);
module.exports = router;
