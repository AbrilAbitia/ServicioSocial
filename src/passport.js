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
                usernameField: 'curp',
                passwordField: 'password',
                passReqToCallback: true
            },
                    function (request, curp, password, done) {
                        console.log("Registro - Buscando usuario: " + curp);
                        console.log("Request: " + request);
                        process.nextTick(function () {
                            User.findOne({'curp': curp}, function (error, user) {
                                if (error) {
                                    return done(error);
                                }
                                if (user) {
                                    console.log(user + " ya existe.");
                                    return done(null, false, request.flash('signupMessage', 'Ese correo ya está registrado.'));
                                } else {
                                    console.log(user + " no existe.");
                                    var newUser = new User();
                                    newUser.curp = curp;
                                    newUser.correo = request.body.correo;
                                    newUser.password = newUser.generateHash(password);
                                    newUser.rol = request.body.rol;
                                    newUser.nombre = request.body.nombre;
                                    newUser.apellido_paterno = request.body.apellido_paterno;
                                    newUser.apellido_materno = request.body.apellido_materno;
                                    newUser.telefonos = request.body.telefonos;
                                    newUser.direccion.calle = request.body.calle;
                                    newUser.direccion.colonia = request.body.colonia;
                                    newUser.direccion.codigo_postal = request.body.codigo_postal;
                                    newUser.direccion.municipio = request.body.municipio;
                                    newUser.fecha_nacimiento = new Date(request.body.fecha_nacimiento);
                                    newUser.rfc = request.body.rfc;
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
        usernameField: 'curp',
        passwordField: 'password',
        passReqToCallback: true
    },
            function (request, curp, password, done) {
                console.log("Login - Buscando usuario: " + curp);
                console.log("Request: " + request);
                User.findOne({'curp': curp}, function (error, user) {
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


