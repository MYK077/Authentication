const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'email is not registered' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
