var express = require('express');
var router = express.Router();
var alumno_controller = require('../controllers/alumnoController');

router.get('/lista', alumno_controller.alumno_list);

router.get('/registrar', alumno_controller.alumno_registro);

router.get('/:alumnoBoleta([0-9]+)/editar', alumno_controller.alumno_edicion);

router.put('/:alumnoBoleta', alumno_controller.alumno_saveOrUpdate);

router.get('/:alumnoBoleta([0-9]+)', alumno_controller.alumno_detail);

router.delete('/:alumnoBoleta([0-9]+)', alumno_controller.alumno_delete);

module.exports = router;
