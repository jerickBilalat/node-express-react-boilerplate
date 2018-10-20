
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const requireJWT = require('./middlewares/requireJWT');
const debug = require('debug')('app:startup');
const errorLogger = require('./middlewares/errorLogger');
const errorHandler = require('./middlewares/errorHandler');
const pino = require('pino')();
const logger = require('express-pino-logger')({ instance: pino });

const app = express();

app.set('port', process.env.PORT || 9000);
app.set('view', './views');
app.set('view engine', 'pug');

mongoose.Promise = global.Promise;
mongoose
	.connect('mongodb://localhost/events_dev', {useMongoClient: true})
	.then(() => { pino.info("Database connection success")})
	.catch((error) => pino.info('Database Connection Errorr: ' + error));

require('./events/model');
require('./authetication/model');

// SERVICE
require('./services/cache');

app.use(bodyParser.json());
app.use(cors());
app.use(logger);

require('./events/routes')(app);
require('./authetication/routes')(app);

// ERROR HANDLERS
// catch 404 errors
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
app.use(function handleAuthenticationError(err, req, res, next){
	if(err.status === 401){
		err.message = "Invalid email or password";
	}
	return next(err);
})

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		req.log.error(err.stack);
		res.status(err.status || 500);
		res.json({
			errorMessage: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		errrorMessage: err.message,
		error: {}
	});
});


app.get('/', (req,res) => {
	res.send('Hello World');
});

app.get('/authRoute', requireJWT, (req,res) => {
	res.send('Hello Protected Route');
});

const server = app.listen(app.get('port'),() => {
	pino.info('Express listening to port: ' +  app.get('port'));
});


module.exports = {
	app
}