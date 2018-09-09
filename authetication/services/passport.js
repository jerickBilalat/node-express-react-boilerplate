const passport = require('passport');
const User = require('../model');
const config = require('../../config/secret');
const JwtStratety = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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