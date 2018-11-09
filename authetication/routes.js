
const requireMember = require('./middlewares/requireMember');
const requireLocalLogIn = require('./middlewares/requireLocalLogIn')

const {signup: signupController} = require('./controllers/signup');
const {signin: signinController} = require('./controllers/signin');

module.exports = app => {

    app.post('/signup', signupController);
    app.post('/signin', requireLocalLogIn, signinController);

}