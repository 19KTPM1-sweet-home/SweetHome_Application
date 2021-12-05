const userService = require('../app/services/userService');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async function(username, password, done) {
    const user = await userService.findByEmail(username);
    if(!user) {
        return done(null, false, { message: 'Incorrect email.' });
    } 
    if (!userService.validPassword(password, user)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

module.exports = passport;