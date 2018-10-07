const {generateToken} = require('../utils');
const UserClass = require('../model');

module.exports.signup = (req, res, next) => {

    const {firstName, lastName, email, password, role} = req.body;

    UserClass
        .findOne({email: email})
        .then( user => {
            if(user) {
                return res.status(422).send({ errorMessage: "Email is in use"})
            }

            const newUser = new UserClass({
                firstName,
                lastName,
                email,
                password,
                role
            })

            newUser
                .save()
                .then( user => {
                    res.json({userCredentials: {firstName, lastName, role, email}, token: generateToken(user)});
                })
                .catch( err => {
                    return next(err);
                })

        })
        .catch(err => {
            if(err) return next(err);
        })


};
