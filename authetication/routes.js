
const AuthControllers = require('./controllers');
const requireMember = require('./middlewares/requireMember');

module.exports = app => {

    app.post('/signup', requireMember, AuthControllers.signup);

}