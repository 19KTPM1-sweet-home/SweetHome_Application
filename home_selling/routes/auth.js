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
    failureRedirect: '/login/?wrong-password',
    failureFlash: true
}), (req, res) => {
  const returnTo = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(returnTo);
});


router.get('/signup', authController.showSignup);
router.post('/signup', authController.createUser);
module.exports = router;
