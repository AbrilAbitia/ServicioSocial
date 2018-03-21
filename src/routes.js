var alumnos = require('./routes/alumnos');
var profesores = require('./routes/profesores');
var materias = require('./routes/materias');
var usuarios = require('./routes/usuarios');

module.exports = function (app, passport) {

    app.get('/', isLoggedIn, function (request, response) {
        response.render('home', {title: 'Home', message: "HOME", user: request.user});
    });

    app.get('/login', function (request, response) {
        response.render('login', {message: request.flash('loginMessage')});
    });

    app.get('/profile', isLoggedIn, function (request, response) {
        response.render('profile', {
            message: request.user.username
        });
    });

    app.get('/logout', function (request, response) {
        request.logout();
        response.redirect('/');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/usuarios/registro_usuario',
        failureFlash: true
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.use('/alumnos', alumnos);
    app.use('/profesores', profesores);
    app.use('/materias', materias);
    app.use('/usuarios', usuarios);

};

function isLoggedIn(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/login');
}


