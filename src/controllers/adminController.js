var Admin = require('../models/usuario');

exports.admin_list = function (request, response) {
    var query = Admin.find({'curp': 1});
    var promise = query.exec();
    promise.then(function (list_admins) {
        console.log("Administradores: " + list_admins);
        response.render('administradores', {title: 'Lista de administradores', administradores: list_admins});
    }).catch(function (error) {
        console.log(error);
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.admin_registro = function (request, response) {
    if (request.query.option === 'create') {
        response.render('administrador_form', {title: 'Registrar administrador', isCurpDisabled: false, areFieldsDisabled: false});
    } else {
        console.log('Buscar administrador: ' + request.query.admin);
        var query = Admin.findOne({curp: request.query.admin}, {});
        var promise = query.exec();
        promise.then(function (admin) {
            console.log('Encontrado: ' + admin);
            response.render('administrador_form', {title: 'Editar administrador', admin: admin, isCurpDisabled: true, areFieldsDisabled: false});
        }).catch(function (error) {
            response.locals.message = 'Not found';
            response.locals.error = error;
            response.status(error.status || 500);
            response.render('error');
        });
    }
};

exports.admin_detail = function (request, response) {
    console.log("Buscar administrador: " + request.params.admin);
    var query = Admin.findOne({curp: request.params.admin}, {});
    var promise = query.exec();
    promise.then(function (admin) {
        console.log("Encontrado: " + admin);
        response.render('administrador_form', {title: 'Ver usuario', admin: admin, isCurpDisabled: true, areFieldsDisabled: true});
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.admin_saveOrUpdate = function (request, response) {
    console.log("save or update");
    var hash;
    if (request.body.password.length > 0) {
        hash = new Admin().generateHash(request.body.password);
    } else {
        hash = null;
    }
    var date = new Date(request.body.fecha_nacimiento);
    var address = {calle: request.body.calle,
        colonia: request.body.colonia,
        codigo_postal: request.body.codigo_postal,
        municipio: request.body.municipio
    };
    let admin = new Admin({
        _id: request.body.curp,
        password: hash,
        correo: request.body.correo,
        rol: request.body.rol,
        nombre: request.body.nombre,
        pellido_paterno: request.body.apellido_paterno,
        apellido_materno: request.body.apellido_materno,
        telefonos: request.body.telefonos,
        direccion: address,
        fecha_nacimiento: date,
        rfc: request.body.rfc
    });
    var query = Admin.findOneAndUpdate({curp: request.body.curp}, {$set: admin}, {new : true});
    var promise = query.exec();
    promise.then(function (admin) {
        console.log("admin creado: " + admin);
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.admin_delete = function (request, response) {
    response.send('NOT IMPLEMENTED: Usuario delete DELETE');
};
