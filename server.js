
const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'),() => {
    console.log('Express listening to port: ' +  server.address().port);
});