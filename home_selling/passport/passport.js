const userService = require('../app/services/userService');

const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  async function(req, username, password, done) {
    const user = await userService.findByEmail(username);
    if(!user) {
        return done(null, false, { messages: req.flash('errorMsg', 'Incorrect email') });
    }
    const passwordValid = await userService.validPassword(password, user.password);
    if (!passwordValid) {
      return done(null, false, { messages: req.flash('errorMsg', 'Incorrect password') });
    }
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  const sessionUser = {
    _id: user._id, 
    fullName: user.fullName, 
    email: user.email, 
    address: user.address,
    phoneNumber: user.phoneNumber || ""
  };
  done(null, sessionUser);
});

passport.deserializeUser(async function(user, done) {
  const newUser = await userService.findByEmail(user.email);
  const sessionUser = {
    _id: newUser._id.toString(), 
    fullName: newUser.fullName, 
    email: newUser.email, 
    address: newUser.address,
    phoneNumber: newUser.phoneNumber || ""
  };
  done(null, sessionUser);
});

module.exports = passport;