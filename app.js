const express = require('express');
const app = express();

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0';

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var db = require('./src/database-connection');
var alumnos = require('./src/routes/alumnos');
var profesores = require('./src/routes/profesores');
var materias = require('./src/routes/materias');
var usuarios = require('./src/routes/usuarios');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (request, response, next) {
    var error = request.session.error;
    var message = request.session.notice;
    var success = request.session.success;
    delete request.session.error;
    delete request.session.success;
    delete request.session.notice;
    if (error)
        response.locals.error = error;
    if (message)
        response.locals.notice = message;
    if (success)
        response.locals.success = success;
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (request, response) {
    response.render('home', {title: 'Home', message: "HOME", user: request.user});
});

app.get('/signin', function (request, response) {
    response.render('login');
});

app.post('/local-reg', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signin'
}));

app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin'
}));

app.get('/logout', function (request, response) {
    var name = request.user.username;
    console.log("LOGGIN OUT " + request.user.username)
    request.logout();
    response.redirect('/');
    request.session.notice = "You have successfully been logged out " + name + "!";
});

app.use('/alumnos', alumnos);
app.use('/profesores', profesores);
app.use('/materias', materias);
app.use('/usuarios', usuarios);

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

app.listen(port, ip, function () {
    console.log('App listening on ' + ip + ":" + port + " !");
});
