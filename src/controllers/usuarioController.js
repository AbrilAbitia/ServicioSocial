var Usuario = require('../models/usuario');

exports.usuario_list = function (request, response) {
    var query = Usuario.find({});
    var promise = query.exec();
    promise.then(function (list_usuarios) {
        console.log("Usuarios: " + list_usuarios);
        response.render('usuarios', {title: 'Lista de usuarios', usuarios: list_usuarios});
    }).catch(function (error) {
        console.log(error);
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.usuario_registro = function (request, response) {
    var usuario = null;
    if (request.query.option === 'create') {
        usuario = {
            usuario: '',
            nombre: '',
            apellido_paterno: '',
            apellido_materno: ''
        };
        response.render('usuario_form', {title: 'Registrar usuario', usuario: usuario, isUsuarioDisabled: false, areFieldsDisabled: false});
    } else {
        console.log('Buscar usuario: ' + request.query.usuarioUsuario);
        var query = Usuario.findOne({usuario: request.query.usuarioUsuario}, {});
        var promise = query.exec();
        promise.then(function (usuario) {
            console.log('Encontrado: ' + usuario);
            response.render('usuario_form', {title: 'Editar usuario', usuario: usuario, isUsuarioDisabled: true, areFieldsDisabled: false});
        }).catch(function (error) {
            response.locals.message = 'Not found';
            response.locals.error = error;
            response.status(error.status || 500);
            response.render('error');
        });
    }
};

exports.usuario_detail = function (request, response) {
    console.log("Buscar usuario: " + request.params.usuario);
    var query = Usuario.findOne({user: request.params.usuario}, {});
    var promise = query.exec();
    promise.then(function (usuario) {
        console.log("Encontrado: " + usuario);
        response.render('usuario_form', {title: 'Ver usuario', usuario: usuario, isUsuarioDisabled: true, areFieldsDisabled: true});
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.usuario_saveOrUpdate = function (request, response) {
    console.log("save or update");
    let usuario = new Usuario({
        _id: request.body.user,
        user: request.body.user,
        password: request.body.password
    });
    var query = Usuario.findOneAndUpdate({user: usuario.user}, {$set: usuario}, {upsert: true, new : true});
    var promise = query.exec();
    promise.then(function (usuario) {
        console.log("usuario creado: " + usuario);
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.usuario_delete = function (request, response) {
    response.send('NOT IMPLEMENTED: Usuario delete DELETE');
};
