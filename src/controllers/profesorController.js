var Profesor = require('../models/profesor');

exports.profesor_list = function (request, response) {
    var query = Profesor.find({});
    var promise = query.exec();
    promise.then(function (list_profesores) {
        console.log("Profesores: " + list_profesores);
        response.render('profesores', {title: 'Lista de profesores', profesores: list_profesores});
    }).catch(function (error) {
        console.log(error);
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.profesor_registro = function (request, response) {
    var profesor = null;
    if (request.query.option === 'create') {
        profesor = {
            numero: '',
            nombre: '',
            apellido_paterno: '',
            apellido_materno: ''
        };
        response.render('profesor_form', {title: 'Registrar profesor', profesor: profesor, isNumeroDisabled: false, areFieldsDisabled: false});
    } else {
        console.log('Buscar profesor: ' + request.query.profesorNumero);
        var query = Profesor.findOne({numero: request.query.profesorNumero}, {});
        var promise = query.exec();
        promise.then(function (profesor) {
            console.log('Encontrado: ' + profesor);
            response.render('profesor_form', {title: 'Editar profesor', profesor: profesor, isNumeroDisabled: true, areFieldsDisabled: false});
        }).catch(function (error) {
            response.locals.message = 'Not found';
            response.locals.error = error;
            response.status(error.status || 500);
            response.render('error');
        });
    }
};

exports.profesor_detail = function (request, response) {
    console.log("Buscar profesor: " + request.params.profesorNumero);
    var query = Profesor.findOne({numero: request.params.profesorNumero}, {});
    var promise = query.exec();
    promise.then(function (profesor) {
        console.log("Encontrado: " + profesor);
        response.render('profesor_form', {title: 'Ver profesor', profesor: profesor, isNumeroDisabled: true, areFieldsDisabled: true});
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.profesor_saveOrUpdate = function (request, response) {
    console.log("save or update");
    let profesor = new Profesor({
        _id: request.body.numero,
        numero: request.body.numero,
        nombre: request.body.nombre,
        apellido_paterno: request.body.apellido_paterno,
        apellido_materno: request.body.apellido_materno
    });
    var query = Profesor.findOneAndUpdate({numero: profesor.numero}, {$set: profesor}, {upsert: true, new : true});
    var promise = query.exec();
    promise.then(function (profesor) {
        console.log("profesor creado: " + profesor);
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.profesor_delete = function (request, response) {
    response.send('NOT IMPLEMENTED: Profesor delete DELETE');
};
