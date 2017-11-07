const express = require('express');
const app = express();

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var db = require('./src/database-connection');
var alumnos = require('./src/routes/alumnos');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.get('/', function (request, response) {
    response.render('home', {title: 'Home', message: "HOME"});
});

app.use('/alumnos', alumnos);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(function (request, response, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, request, response, next) {
    response.locals.message = err.message;
    response.locals.error = err;
    response.status(err.status || 500);
    response.render('error');
});