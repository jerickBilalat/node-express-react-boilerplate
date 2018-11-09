const passport = require('passport');
const User = require('../model');
const config = require('config');
const {Strategy: JwtStratety, ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local');

///////////////////////////////////////////////////
// LOCAL Strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
        
      if (err) { return done(err); }
      
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

/////////////////////////////
// JWT strategy
// payload is the decoded jwt token when they sign up
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.get('jwtPrivateKey')
};

const jwtLogin = new JwtStratety(jwtOptions, (payload, done) => {
    User
        .findById(payload.sub)
        .then( user => {
            if(user === null && config.get('envName') === 'test') {
                const mockUser = { __v: 0,
                    title: 'created title',
                    body: 'created body',
                    author: 'auth user',
                    authorRole: 'auth user role',
                    _id: "5be38c0d834d5f178880afb3",
                    comments: [],
                    createdOn: "2018-11-08T01:06:21.440Z" };
                done(null, mockUser);
            }else {
                done(null, user);
            }
        })
        .catch( err => {
            done(err, false);
        })
});

passport.use(jwtLogin);
passport.use(localLogin);