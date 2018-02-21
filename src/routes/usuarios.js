var express = require('express');
var router = express.Router();
var usuario_controller = require('../controllers/usuarioController');

router.get('/', function (request, response) {
    response.render('usuarios_home', {title: 'Usuarios Home', message: "Página de usuarios"});
});

router.get('/lista', usuario_controller.usuario_list);

router.get('/registro_usuario', usuario_controller.usuario_registro);

router.get('/:usuarioUsuario([0-9]+)', usuario_controller.usuario_detail);

router.put('/:usuarioUsuario', usuario_controller.usuario_saveOrUpdate);

router.delete('/:usuarioUsuario', usuario_controller.usuario_delete);

module.exports = router;
