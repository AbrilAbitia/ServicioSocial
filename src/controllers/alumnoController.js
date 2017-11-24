var Alumno = require('../models/alumno');

exports.alumno_list = function (request, response) {
    var query = Alumno.find({});
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
    var alumno = null;
    if (request.query.option === 'create') {
        alumno = {
            boleta: '',
            nombre: '',
            apellido_paterno: '',
            apellido_materno: ''
        };
        response.render('alumno_form', {title: 'Registrar alumno', alumno: alumno, isBoletaDisabled: false, areFieldsDisabled: false});
    } else {
        console.log('Buscar alumno: ' + request.query.alumnoBoleta);
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
    }
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
    console.log("save or update");
    let alumno = new Alumno({
        _id: request.body.boleta,
        boleta: request.body.boleta,
        nombre: request.body.nombre,
        apellido_paterno: request.body.apellido_paterno,
        apellido_materno: request.body.apellido_materno
    });
    var query = Alumno.findOneAndUpdate({boleta: alumno.boleta}, {$set: alumno}, {upsert: true, new : true});
    var promise = query.exec();
    promise.then(function (alumno) {
        console.log("alumno creado: " + alumno);
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.alumno_delete = function (request, response) {
    response.send('NOT IMPLEMENTED: Alumno delete DELETE');
};
