var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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

function saveOrUpdate(alumno) {
    console.log("alumno creado: " + alumno);
    AlumnoSchema.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(alumno._id)
    }, {alumno}, {upsert: true}, function (error, response) {
        console.log("Error: " + error);
        console.log("Response: " + response);
    });
}

module.exports = mongoose.model('Alumno', AlumnoSchema);
