const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');
const authController = require('../app/controllers/authController');
router.post('/reset-password',authController.resetPassword);
router.get('/reset-password',authController.showResetPassword);
router.get('/login/forgot-password/success', authController.showSendEmailSuccess);
router.post('/login/forgot-password', authController.sendResetLinkToEmail);
router.get('/login/forgot-password', authController.showSendEmail);
router.get('/login', authController.showLogin);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login/?wrong-password',
    failureFlash: true
}), (req, res) => {
  const returnTo = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(returnTo);
});

router.get('/signup/activate',authController.activateEmail)
router.get('/signup', authController.showSignup);
router.post('/signup', authController.createUser);
module.exports = router;
