const passport = require('passport');
require('../authetication/services/passport');
const requireJWT = passport.authenticate('jwt', {session: false});

module.exports = requireJWT;