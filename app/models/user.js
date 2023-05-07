// User Schema Definition
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;
// Defining salt constant
var SALT_WORK_FACTOR = 10,
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 30 * 60 * 10000;
// Defining the User Schema
const UserSchema = new Schema({
    email: {type: String, trim: true, required: true, unique: true},
    password: {type: String, required: true},
    prev_password: {type: String},
    name: {type: String, trim: true, required: true},
    loginAttempts: {type: Number, required: true, default: 0},
    lockUntil: {type: Number},
    requestToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: String
}, {timestamps: true});
// Methods for UserSchema
// Generate password hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
};
// Check if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
// Increment login attempts
UserSchema.methods.incLoginAttempts = function(cb) {
    if (this.lockUntil && this.lockUntil < Date.now()) {
        // if we have a previous lock that has expired
        return this.update({
            $set: {loginAttempts: 1},
            $unset: {lockUntil: 1}
        }, cb);
    } else if (!this.lockUntil && this.loginAttempts == MAX_LOGIN_ATTEMPTS) {
        // if user is not locked and this is his MAX_LOGIN_ATTEMPTS
        return this.update({
            $set: {lockUntil: Date.now() + LOCK_TIME}
        }, cb);
    } else {
        // if user is not locked, then increment loginAttempts
        return this.update({
            $inc: {loginAttempts: 1}
        }, cb);
    }
};
// Reset login attempts
UserSchema.methods.resetLoginAttempts = function(cb) {
    return this.update({
        $set: {loginAttempts: 0},
        $unset: {lockUntil: 1}
    }, cb);
};
// Create the model for User and expose it to app
module.exports.User = mongoose.model('User', UserSchema);
