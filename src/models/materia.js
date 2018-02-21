var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var MateriaSchema = Schema(
        {
            nombre: {type: String, required: true, max: 100},
            tipo: {type: String, required: true, max: 100}
        }
);

module.exports = mongoose.model('Materia', MateriaSchema);