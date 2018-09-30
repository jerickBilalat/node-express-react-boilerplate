
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const requireJWT = require('./middlewares/requireJWT');
const winston = require('winston');
const debug = require('debug')('app:startup');


winston.add(new winston.transports.File( { filename: "logfile.log"}));

require('./events/model');
require('./authetication/model');

mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb://localhost/events_dev', {useMongoClient: true})
    .then(() => { debug("Database connection success")})
    .catch((error) => debug('warning', error));

const app = express();

app.set('port', process.env.PORT || 9000);
app.set('view', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(cors());

if(process.env === "development") {
    app.use((err, req, res, next) => {
        winston.error(err.message, err);
        res.status(err.status || 500);
    })
}
app.use(function(err, req, res, next) {
    res.send({errorMessage: err.message})
})

// ROUTES
require('./events/routes')(app);
require('./authetication/routes')(app);

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.get('/authRoute', requireJWT, (req,res) => {
    res.send('Hello Protected Route');
});



const server = app.listen(app.get('port'),() => {
    debug('Express listening to port: ' +  server.address().port);
});
