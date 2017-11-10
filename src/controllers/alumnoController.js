var Alumno = require('../models/alumno');

exports.alumno_list = function (request, response) {
    var query = Alumno.find({}, 'boleta');
    var promise = query.exec();
    promise.then(function (error, list_alumnos) {
        if (error) {
            response.locals.message = 'Not found';
            response.locals.error = error;
            response.status(error.status || 500);
            response.render('error');
        } else {
            response.render('alumnos', {title: 'Lista de alumnos', alumnos: list_alumnos});
        }
    });
};

exports.alumno_registro = function (request, response) {
    if (request.query.create === 'true') {
        response.render('alumno_form', {title: 'Registro de alumno'});
    } else {
        response.render('alumno_form', {title: 'Editar alumno', numeroBoleta: '2010630285'});
    }
};

exports.alumno_detail = function (request, response) {
    response.send('NOT IMPLEMENTED: Alumno detail: ' + request.params.alumnoBoleta);
};

exports.alumno_saveOrUpdate = function (request, response) {
    console.log("save or update");
    let alumno = new Alumno({
        boleta: request.boleta,
        nombre: request.nombre,
        apellido_paterno: request.apellido_paterno,
        apellido_materno: request.apellido_materno
    });
    Alumno.saveOrUpdate(alumno);
};

exports.alumno_delete = function (request, response) {
    response.send('NOT IMPLEMENTED: Alumno delete DELETE');
};
