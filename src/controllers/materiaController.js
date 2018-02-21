var Materia = require('../models/materia');

exports.materia_list = function (request, response) {
    var query = Materia.find({});
    var promise = query.exec();
    promise.then(function (list_materias) {
        console.log("Materias: " + list_materias);
        response.render('materias', {title: 'Lista de materias', materias: list_materias});
    }).catch(function (error) {
        console.log(error);
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.materia_registro = function (request, response) {
    var materia = null;
    if (request.query.option === 'create') {
        materia = {
            clave: '',
            nombre: '',
            apellido_paterno: '',
            apellido_materno: ''
        };
        response.render('materia_form', {title: 'Registrar materia', materia: materia, isClaveDisabled: false, areFieldsDisabled: false});
    } else {
        console.log('Buscar materia: ' + request.query.materiaClave);
        var query = Materia.findOne({clave: request.query.materiaClave}, {});
        var promise = query.exec();
        promise.then(function (materia) {
            console.log('Encontrado: ' + materia);
            response.render('materia_form', {title: 'Editar materia', materia: materia, isClaveDisabled: true, areFieldsDisabled: false});
        }).catch(function (error) {
            response.locals.message = 'Not found';
            response.locals.error = error;
            response.status(error.status || 500);
            response.render('error');
        });
    }
};

exports.materia_detail = function (request, response) {
    console.log("Buscar materia: " + request.params.materiaClave);
    var query = Materia.findOne({clave: request.params.materiaClave}, {});
    var promise = query.exec();
    promise.then(function (materia) {
        console.log("Encontrado: " + materia);
        response.render('materia_form', {title: 'Ver materia', materia: materia, isClaveDisabled: true, areFieldsDisabled: true});
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.materia_saveOrUpdate = function (request, response) {
    console.log("save or update");
    let materia = new Materia({
        _id: request.body.clave,
        clave: request.body.clave,
        nombre: request.body.nombre,
        tipo: request.body.tipo
    });
    var query = Materia.findOneAndUpdate({clave: materia.clave}, {$set: materia}, {upsert: true, new : true});
    var promise = query.exec();
    promise.then(function (materia) {
        console.log("materia creado: " + materia);
    }).catch(function (error) {
        response.locals.message = 'Not found';
        response.locals.error = error;
        response.status(error.status || 500);
        response.render('error');
    });
};

exports.materia_delete = function (request, response) {
    response.send('NOT IMPLEMENTED: Materia delete DELETE');
};
