var express = require('express');
var router = express.Router();
var alumno_controller = require('../controllers/alumnoController');

router.get('/', function (request, response) {
    response.render('alumnos_home', {title: 'Alumnos Home', message: "Página de alumnos"});
});

router.get('/lista', alumno_controller.alumno_list);

router.get('/registro_alumno', alumno_controller.alumno_registro);

router.get('/:alumnoBoleta([0-9]+)', alumno_controller.alumno_detail);

router.put('/:alumnoBoleta', alumno_controller.alumno_saveOrUpdate);

router.delete('/:alumnoBoleta', alumno_controller.alumno_delete);

module.exports = router;
