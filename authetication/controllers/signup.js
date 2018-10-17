const {generateToken} = require('../utils');
const User = require('../model');

module.exports.signup = (req, res, next) => {

	const {firstName, lastName, email, password, role} = req.body;

	User
		.findOne({email: email})
		.then( user => {
			if(user) {
					return res.status(422).send({ errorMessage: "Email is in use"})
			}
			User
				.create({
					firstName,
					lastName,
					email,
					password,
					role
				})
				.then( user => res.json({
					userCredentials: {firstName, lastName, role, email}, 
					token: generateToken(user)
				}))
				.catch(err => next(err))
		})
		.catch(err => {
				if(err) return next(err);
		})


};
