var express = require('express');
var router = express.Router();
var admin_controller = require('../controllers/adminController');

router.get('/lista', admin_controller.admin_list);

router.get('/registrar', admin_controller.admin_registro);

router.get('/:admin([A-Za-z0-9]+)/editar', admin_controller.admin_edicion);

router.put('/:admin([A-Za-z0-9]+)', admin_controller.admin_saveOrUpdate);

router.get('/:admin([A-Za-z0-9]+)', admin_controller.admin_detail);

router.delete('/:admin([A-Za-z0-9]+)', admin_controller.admin_delete);

module.exports = router;

