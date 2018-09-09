
const requireMember = require('./middlewares/requireMember');

const {signup: signupController} = require('./controllers/signup');
const {login: loginController} = require('./controllers/login');

module.exports = app => {

    app.post('/signup', requireMember, signupController);
    app.post('/login', loginController);

}