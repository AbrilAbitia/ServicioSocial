function putAlumno() {
    $.ajax({
        type: 'PUT',
        url: '/alumnos/' + $('#boleta').prop('value'),
        data: $('#alumnoForm').serialize(),
        success: function (data) {
            alert(data);
        }
    });
}

function putProfesor() {
    $.ajax({
        type: 'PUT',
        url: '/profesores/' + $('#numero').prop('value'),
        data: $('#profesorForm').serialize(),
        success: function (data) {
            alert(data);
        }
    });
}

function putUsuario() {
    $.ajax({
        type: 'PUT',
        url: '/usuarios/' + $('#usuario').prop('value'),
        data: $('#usuarioForm').serialize(),
        success: function (data) {
            alert(data);
        }
    });
}

function putMateria() {
    $.ajax({
        type: 'PUT',
        url: '/materias/' + $('#clave').prop('value'),
        data: $('#materiaForm').serialize(),
        success: function (data) {
            alert(data);
        }
    });
}