var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var AlumnoSchema = Schema(
        {
            boleta: {type: String, required: true, unique: true, max: 20},
            nombre: {type: String, required: true, max: 100},
            apellido_paterno: {type: String, required: true, max: 100},
            apellido_materno: {type: String, required: true, max: 100}
        },
        {
            toObject: {virtuals: true},
            toJSON: {virtuals: true}
        }
);

AlumnoSchema.virtual('nombre_completo').get(function () {
    return this.nombre + ' ' + this.apellido_paterno + ' ' + this.apellido_materno;
});

AlumnoSchema.virtual('url').get(function () {
    return '/alumnos/' + this.boleta;
});

module.exports = mongoose.model('Alumno', AlumnoSchema);
