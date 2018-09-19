const jwt = require('jwt-simple');
const config = require('../config/secret');

module.exports.generateToken = function(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timeStamp}, config.secret);
};