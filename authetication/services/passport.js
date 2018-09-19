const passport = require('passport');
const User = require('../model');
const config = require('../../config/secret');
const {Strategy: JwtStratety, ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local');

///////////////////
// LOCAL Strategy

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  console.log(email)
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    console.log(password)
    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { console.log(err); return done(err); }
      if (!isMatch) { return done(null, false); }
        console.log(user);
      return done(null, user);
    });
  });
});

/////////////////////////////
// JWT strategy
// payload is the decoded jwt token when they sign up
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.secret
};

const jwtLogin = new JwtStratety(jwtOptions, (payload, done) => {
    User
        .findById(payload.sub)
        .then( user => {
            done(null, user);
        })
        .catch( err => {
            done(err, false);
        })
});

passport.use(jwtLogin);
passport.use(localLogin);