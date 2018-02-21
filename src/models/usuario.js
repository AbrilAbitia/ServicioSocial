var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = Schema(
        {
            user: {type: String, required: true, unique: true, max: 20},
            password: {type: String, required: true, min: 8, max: 16}
        }
);

UserSchema.virtual('url').get(function () {
    return '/usuarios/' + this.user;
});

module.exports = mongoose.model('User', UserSchema);
