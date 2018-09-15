
const requireMember = require('./middlewares/requireMember');

const {signup: signupController} = require('./controllers/signup');
const {signin: signinController} = require('./controllers/signin');

module.exports = app => {

    app.post('/signup', requireMember, signupController);
    app.post('/signin', signinController);

}