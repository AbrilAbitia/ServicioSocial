var express = require('express');
var router = express.Router();
var alumno_controller = require('../controllers/alumnoController');

router.get('/', alumno_controller.alumno_list);

router.get('/:alumnoBoleta', alumno_controller.alumno_detail);

router.put('/:alumnoBoleta', alumno_controller.alumno_saveOrUpdate);

router.delete('/:alumnoBoleta', alumno_controller.alumno_delete);

module.exports = router;
