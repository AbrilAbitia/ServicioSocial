function postUsuario() {
    $.ajax({
        type: 'POST',
        url: '/signup',
        data: $('#usuarioForm').serialize()
    });
}

function putUsuario() {
    $.ajax({
        type: 'PUT',
        url: '/administradores/' + $('#curp').prop('value'),
        data: $('#usuarioForm').serialize()
    });
}

function deleteUsuario(curp) {
    $.ajax({
        type: "DELETE",
        url: '/administradores/' + curp
    });
}

function putMateria() {
    $.ajax({
        type: 'PUT',
        url: '/materias/' + $('#clave').prop('value'),
        data: $('#materiaForm').serialize()
    });
}
