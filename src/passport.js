var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/usuario');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(
            'local-signup',
            new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
                    function (request, username, password, done) {
                        console.log("Registro - Buscando usuario: " + username);
                        process.nextTick(function () {
                            User.findOne({'username': username}, function (error, user) {
                                if (error) {
                                    return done(error);
                                }
                                if (user) {
                                    console.log(user + " ya existe.");
                                    return done(null, false, request.flash('signupMessage', 'Ese correo ya está registrado.'));
                                } else {
                                    console.log(user + " no existe.");
                                    var newUser = new User();
                                    newUser.username = username;
                                    newUser.password = newUser.generateHash(password);
                                    console.log(newUser);
                                    newUser.save(function (err) {
                                        if (err) {
                                            throw err;
                                        }
                                        return done(null, newUser);
                                    });
                                }
                            });
                        });
                    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
            function (request, username, password, done) {
                console.log("Login - Buscando usuario: " + username);
                User.findOne({'username': username}, function (error, user) {
                    if (error) {
                        return done(error);
                    }
                    if (!user) {
                        return done(null, false, request.flash('loginMessage', 'Usuario no encontrado.'));
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, request.flash('loginMessage', 'Contraseña incorrecta.'));
                    }
                    return done(null, user);
                });
            }));
};


