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