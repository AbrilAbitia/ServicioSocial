var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var UserSchema = Schema(
        {
            curp: {type: String, required: true, min: 18, maxlength: 18, unique: true},
            correo: {type: String, required: true, maxlength: 100, unique: true},
            password: {type: String, required: true, min: 8, max: 16},
            rol: {type: Number, required: true}, //0-superadmin, 1-admin, 2-maestro, 3-estudiante
            nombre: {type: String, required: true, maxlength: 100},
            apellido_paterno: {type: String, required: true, maxlength: 100},
            apellido_materno: {type: String, required: true, maxlength: 100},
            telefonos: {type: String, required: true, maxlength: 100},
            direccion: {
                calle: {type: String, required: true, maxlength: 100},
                colonia: {type: String, required: true, maxlength: 100},
                codigo_postal: {type: String, required: true, maxlength: 100},
                municipio: {type: String, required: true, maxlength: 100}
            },
            fecha_nacimiento: {type: Date, required: true},
            rfc: {type: String, required: true, min: 13, maxlength: 13, unique: true},
            alumnoInfo: {
                boleta: {type: String, maxlength: 20},
                acta_nacimiento: {type: Boolean},
                nacionalidad: {type: String, maxlength: 100},
                escuela_procedencia: {type: String, maxlength: 100},
                titulo: {type: String, maxlength: 100},
                cedula: {type: String, maxlength: 100},
                ingles: {type: Boolean},
                semestre: {type: Number},
                fecha_registro: {type: Date},
                fecha_maxima: {type: Date},
                formatos: {type: Array},
                grupo: {type: String, maxlength: 100},
                materias: {type: Array}
            },
            profesorInfo: {

            }
        }
);

UserSchema.virtual('url').get(function () {
    switch (this.rol) {
        case 1:
            return '/administradores/' + this.curp;
        case 2:
            return '/profesores/' + this.curp;
        case 3:
            return '/alumnos/' + this.curp;
        default: return '/error';
    }

});

UserSchema.virtual('nombre_completo').get(function () {
    return this.nombre + ' ' + this.apellido_paterno + ' ' + this.apellido_materno;
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
