var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ProfesorSchema = Schema(
        {
            nombre: {type: String, required: true, maxlength: 100},
            apellido_paterno: {type: String, required: true, maxlength: 100},
            apellido_materno: {type: String, required: true, maxlength: 100},
            numero_registro: {type: String, required: true, maxlength: 20},
            correo: {type: String, required: true, maxlength: 100},
            telefono: [String],
            direccion: {
                calle: {type: String, required: true, maxlength: 100},
                colonia: {type: String, required: true, maxlength: 100},
                codigo_postal: {type: String, required: true, maxlength: 100},
                delegacion_municipio: {type: String, required: true, maxlength: 100}
            },
            curp: {type: String, required: true, min: 18, maxlength: 18},
            rfc: {type: String, required: true, min: 13, maxlength: 13},
            fecha_nacimiento: {type: Date, required: true},
        },
        {
            toObject: {virtuals: true},
            toJSON: {virtuals: true}
        }
);

ProfesorSchema.virtual('nombre_completo').get(function () {
    return this.nombre + ' ' + this.apellido_paterno + ' ' + this.apellido_materno;
});

ProfesorSchema.virtual('url').get(function () {
    return '/profesors/' + this.boleta;
});

module.exports = mongoose.model('Profesor', ProfesorSchema);
