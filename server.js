
const express = require('express');
const app = express();
const keys = require('./config/keys');
const eventsRoute = require('./routes/events');
const mongoose = require('mongoose');
require('./models/events');

// DB connection
mongoose.connect(keys.mongoURI);

// ROUTES
eventsRoute(app);

app.get('/', (req,res) => {
    res.send('Hello World');
});

// SETTINGS
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'),() => {
    console.log('Express listening to port: ' +  server.address().port);
});
