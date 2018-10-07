const User = require('../model');
const config = require('../../config/secret');
const utils = require('../utils');


module.exports.signin = (req,res, next) => {
   const { firstName, lastName, email, role} = req.user;
   res.json({userCredentials: {firstName, lastName, role, email}, token: utils.generateToken(req.user)});
}