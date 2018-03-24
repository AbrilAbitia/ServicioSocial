var express = require('express');
var router = express.Router();
var admin_controller = require('../controllers/adminController');

router.get('/lista', admin_controller.admin_list);

router.get('/registro_administrador', admin_controller.admin_registro);

router.put('/:admin([A-Za-z0-9]+)', admin_controller.admin_saveOrUpdate);

router.get('/:admin([A-Za-z0-9]+)', admin_controller.admin_detail);

router.delete('/:admin', admin_controller.admin_delete);

module.exports = router;

