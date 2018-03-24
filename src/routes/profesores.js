var express = require('express');
var router = express.Router();
var profesor_controller = require('../controllers/profesorController');

router.get('/lista', profesor_controller.profesor_list);

router.get('/registro_profesor', profesor_controller.profesor_registro);

router.get('/:profesorNumero([0-9]+)', profesor_controller.profesor_detail);

router.put('/:profesorNumero', profesor_controller.profesor_saveOrUpdate);

router.delete('/:profesorNumero', profesor_controller.profesor_delete);

module.exports = router;
