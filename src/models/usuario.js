var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = Schema(
        {
            user: {type: String, required: true, unique: true, max: 20},
            password: {type: String, required: true, min: 8, max: 16}
        }
);

module.exports = mongoose.model('User', UserSchema);
