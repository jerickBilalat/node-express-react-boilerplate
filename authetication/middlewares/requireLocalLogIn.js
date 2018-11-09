const passport = require('passport');
require('../services/passport');

const requireLocalLogIn = passport.authenticate('local', {session: false, failWithError: true});

module.exports = requireLocalLogIn;