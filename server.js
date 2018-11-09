
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const requireJWT = require('./middlewares/requireJWT');
const pino = require('pino')();
const logger = require('express-pino-logger')({ instance: pino });
const app = express();

app.set('port', process.env.PORT || config.get('port'));
app.set('view', './views');
app.set('view engine', 'pug');

mongoose.Promise = global.Promise;
mongoose
	.connect(config.get('db'), {useMongoClient: true})
	.then(() => { pino.info(`Connceted Database is ${config.get('db')}`)})
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
app.get('/', (req,res) => {
	res.send('Hello World. Events API.');
});

app.get('/authRoute', requireJWT, (req,res) => {
	res.send('Hello Protected Route');
});

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
		errorMessage: err.message,
		error: {}
	});
});

const server = app.listen(app.get('port'),() => {
	pino.info('Express listening to port: ' +  app.get('port') + " in " + config.get('envName'));
});


module.exports = server;