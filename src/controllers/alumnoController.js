var Alumno = require('../models/usuario');

exports.alumno_list = function (request, response) {
    var query = Alumno.find({'rol': 3});
    var promise = query.exec();
    promise.then(function (list_alumnos) {
        console.log("Alumnos: " + list_alumnos);
        response.render('alumnos', {title: 'Lista de alumnos', alumnos: list_alumnos});
    }).catch(function (error) {
        console.log(error);
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.alumno_registro = function (request, response) {
    console.log('Crear alumno');
    response.render('alumno_form', {title: 'Registrar alumno', isBoletaDisabled: false, areFieldsDisabled: false});
};

exports.alumno_edicion = function (request, response) {
    console.log('Editar alumno: ' + request.query.alumnoBoleta);
    var query = Alumno.findOne({boleta: request.query.alumnoBoleta}, {});
    var promise = query.exec();
    promise.then(function (alumno) {
        console.log('Encontrado: ' + alumno);
        response.render('alumno_form', {title: 'Editar alumno', alumno: alumno, isBoletaDisabled: true, areFieldsDisabled: false});
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.alumno_detail = function (request, response) {
    console.log("Buscar alumno: " + request.params.alumnoBoleta);
    var query = Alumno.findOne({boleta: request.params.alumnoBoleta}, {});
    var promise = query.exec();
    promise.then(function (alumno) {
        console.log("Encontrado: " + alumno);
        response.render('alumno_form', {title: 'Ver alumno', alumno: alumno, isBoletaDisabled: true, areFieldsDisabled: true});
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.alumno_saveOrUpdate = function (request, response) {
    console.log("Save or update");
    var hash;
    if (request.body.password.length > 0) {
        hash = new Alumno().generateHash(request.body.password);
    } else {
        hash = null;
    }
    var date = new Date(request.body.fecha_nacimiento);
    var address = {
        calle: request.body.calle,
        colonia: request.body.colonia,
        codigo_postal: request.body.codigo_postal,
        municipio: request.body.municipio
    };
    let alumno = new Alumno({
        _id: request.body.curp,
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
    if (hash !== null) {
        alumno.password = hash;
    }
    var query = Alumno.findOneAndUpdate({curp: request.body.curp}, {$set: alumno}, {new : true});
    var promise = query.exec();
    promise.then(function (alumno) {
        console.log("Alumno creado: " + alumno);
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.alumno_delete = function (request, response) {
    console.log('Borrar alumno');
    var query = Alumno.deleteOne({curp: request.params.alumnoBoleta});
    var promise = query.exec();
    promise.then(function () {
        console.log("Alumno borrado: " + request.params.alumnoBoleta);
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};
