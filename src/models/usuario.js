var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var UserSchema = Schema(
        {
            username: {type: String, required: true, unique: true, max: 20},
            password: {type: String, required: true, min: 8, max: 16}
        }
);

UserSchema.virtual('url').get(function () {
    return '/usuarios/' + this.user;
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
