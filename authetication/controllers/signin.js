const User = require('../model');
const config = require('../../config/secret');
const utils = require('../utils');


module.exports.signin = (req,res, next) => {
   // passport made req.user
   console.log(req.user);
   res.send({ role: req.role, token: utils.generateToken(req.user)  })
}