const jwt = require('jwt-simple');
const config = require('../../config/secret');
const UserClass = require('../model');

function tokenForUser(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timeStamp}, config.secret);
}

function validateEmailOrPassword(email, password, res) {
    // add email valication here
    if(!email||!password) {
        return res.status(422).send({
            error: "You must provide email or password"
        })
    }
    if(!email) return null;
    return email;
}

module.exports.signup = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    validateEmailOrPassword(email, password, res);    

    UserClass
        .findOne({email: email})
        .then( user => {
            
            if(user) {
                res.status(422).send({ message: "Email is in use"})
            }

            const newUser = new UserClass({
                email,
                password,
                role
            })

            newUser
                .save()
                .then( user => {
                    res.json({role, token:tokenForUser(user)});
                })
                .catch( err => {
                    return next(err);
                })

        })
        .catch(err => {
            if(err) return next(err);
        })


};
