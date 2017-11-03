const express = require('express');
const app = express();
var alumnos = require('./routes/alumnos');

app.get('/', function (request, response) {
    response.send('Hello World!');
});

app.use('/alumnos', alumnos);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


