var administradores = require('./routes/administradores');
//var profesores = require('./routes/profesores');
//var alumnos = require('./routes/alumnos');
var materias = require('./routes/materias');

module.exports = function (app, passport) {

    app.get('/', isLoggedIn, function (request, response) {
        response.redirect('/profile');
    });

    app.get('/login', function (request, response) {
        response.render('login', {message: request.flash('loginMessage')});
    });

    app.get('/profile', isLoggedIn, function (request, response) {
        response.render('profile', {
            curp: request.user.curp,
            rol: request.user.rol,
            json: request.user
        });
    });

    app.post('/signup', passport.authenticate('local-signup'), function (request, response) {
        console.log(request.body.curp);
        console.log(request.body.password);
        response.redirect('/');
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', function (request, response) {
        request.logout();
        response.redirect('/');
    });

    app.get('/error', function (request, response) {
        response.render('error', {message: 'ERROR', error: request.flash('error')});
    });

    app.use('/administradores', administradores);
    //app.use('/alumnos', alumnos)(app, passport);
    //app.use('/profesores', profesores)(app, passport);
    app.use('/materias', materias);

};

function isLoggedIn(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/login');
}


