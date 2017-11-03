var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AlumnoSchema = Schema(
        {
            boleta: {type: String, required: true, max: 20},
            nombre: {type: String, required: true, max: 100},
            apellido_paterno: {type: String, required: true, max: 100},
            apellido_materno: {type: String, required: true, max: 100}
        }
);
// Virtual for author's full name
AlumnoSchema.virtual('nombre_completo').get(function () {
    return this.nombre + ', ' + this.apellido_paterno + ', ' + this.apellido_materno;
});
// Virtual for alumno's URL
AlumnoSchema.virtual('url').get(function () {
    return '/alumnos/alumno/' + this._id;
});
// Export model
module.exports = mongoose.model('Alumno', AlumnoSchema);

