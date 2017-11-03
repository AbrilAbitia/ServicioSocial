var Alumno = require('../models/alumno');

// Display list of all Alumnos
exports.alumno_list = function (request, response) {
    response.send('NOT IMPLEMENTED: Alumno list');
};

// Display detail page for a specific Alumno
exports.alumno_detail = function (request, response) {
    response.send('NOT IMPLEMENTED: Alumno detail: ' + request.params.alumnoBoleta);
};

// Handle Alumno create on PUT
exports.alumno_saveOrUpdate = function (request, response) {
    response.send('NOT IMPLEMENTED: Alumno save or update PUT');
};

// Display Alumno delete form on DELETE
exports.alumno_delete = function (request, response) {
    response.send('NOT IMPLEMENTED: Alumno delete DELETE');
};
