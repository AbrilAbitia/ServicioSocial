var express = require('express');
var router = express.Router();
var materia_controller = require('../controllers/materiaController');

router.get('/lista', materia_controller.materia_list);

router.get('/registro_materia', materia_controller.materia_registro);

router.get('/:materiaClave([A-Z]+)', materia_controller.materia_detail);

router.put('/:materiaClave', materia_controller.materia_saveOrUpdate);

router.delete('/:materiaClave', materia_controller.materia_delete);

module.exports = router;
