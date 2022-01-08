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
    if (user.lock == 'true') {
      return done(null, false, { messages: req.flash('errorMsg', 'Your account was banned') });
    }
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {

  done(null, user.email);
});

passport.deserializeUser(async function(email, done) {
  const sessionUser = await userService.findByEmail(email);

  done(null, sessionUser);
});

module.exports = passport;