var Alumno = require('../models/alumno');

exports.alumno_list = function (request, response) {
    var query = Alumno.find({}, 'boleta');
    var promise = query.exec();
    promise.then(function (err, list_alumnos) {
        if (err) {
            response.locals.message = 'Not found';
            response.locals.error = err;
            response.status(err.status || 500);
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
    response.send('NOT IMPLEMENTED: Alumno save or update PUT');
};

exports.alumno_delete = function (request, response) {
    response.send('NOT IMPLEMENTED: Alumno delete DELETE');
};
