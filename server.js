
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const requireJWT = require('./middlewares/requireJWT');

require('./events/model');
require('./authetication/model');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(cors());


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
    console.log('Express listening to port: ' +  server.address().port);
});
