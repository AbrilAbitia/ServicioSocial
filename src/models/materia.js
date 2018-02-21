var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var MateriaSchema = Schema(
        {
            clave: {type: String, required: true, maxlength: 20},
            nombre: {type: String, required: true, max: 100},
            tipo: {type: String, required: true, max: 100}
        }
);

module.exports = mongoose.model('Materia', MateriaSchema);