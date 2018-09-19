const {generateToken} = require('../utils');
const UserClass = require('../model');

function validateEmailOrPassword(email, password, res) {
    // add email validation here
    if(!email||!password) {
        return res.status(422).send({
            error: "You must provide email or password"
        })
    }
    if(!email) return null;
    return email;
}

module.exports.signup = (req, res, next) => {

    const {email, password, role} = req.body

    validateEmailOrPassword(email, password, res);    

    UserClass
        .findOne({email: email})
        .then( user => {
            
            if(user) {
                return res.status(422).send({ message: "Email is in use"})
            }

            const newUser = new UserClass({
                email,
                password,
                role
            })

            newUser
                .save()
                .then( user => {
                    res.json({role, token: generateToken(user)});
                })
                .catch( err => {
                    return next(err);
                })

        })
        .catch(err => {
            if(err) return next(err);
        })


};
