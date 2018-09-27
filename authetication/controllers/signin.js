const User = require('../model');
const config = require('../../config/secret');
const utils = require('../utils');


module.exports.signin = (req,res, next) => {
   // passport made req.user
   console.log(req.user);
   const { firstname, lastname, email, role} = req.user;
   res.json({userCredentials: {firstname, lastname, role, email}, token: utils.generateToken(req.user)});
}