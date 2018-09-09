
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./events/model');
require('./authetication/model');

// DB connection
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

// SETTINGS
app.set('port', process.env.PORT || 3000);

// MIDDLEWARE
app.use(bodyParser.json());

// ROUTES
require('./events/routes')(app);
require('./authetication/routes')(app);

app.get('/', (req,res) => {
    res.send('Hello World');
});



const server = app.listen(app.get('port'),() => {
    console.log('Express listening to port: ' +  server.address().port);
});
