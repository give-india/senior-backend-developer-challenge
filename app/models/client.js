// Schema for mobile or third-party apps
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;
// Defining salt constant
const SALT_WORK_FACTOR = 10;
// Schema: Client
const ClientSchema = new Schema({
    name: {type: String, required: true, unique: true},
    clientId: {type: String, required: true, unique: true},
    clientSecret: {type: String, required: true},
    redirectURI: {type: String, required: true}
}, {timestamps: true});
// Schema: AccessToken
const AccessTokenSchema = new Schema({
    userId: {type: String, required: true},
    clientId: {type: String, required: true},
    token: {type: String, required: true, unique: true}
}, {timestamps: true});
// Schema: RefreshToken
const RefreshTokenSchema = new Schema({
    userId: {type: String, required: true},
    clientId: {type: String, required: true},
    token: {type: String, required: true, unique: true}
}, {timestamps: true});
// Methods for ClientSchema
// Generate hash
ClientSchema.methods.generateHash = function(clientSecret) {
    return bcrypt.hashSync(clientSecret, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
};
// Check if clientSecret is valid
ClientSchema.methods.validClientSecret = function(clientSecret) {
    return bcrypt.compareSync(clientSecret, this.clientSecret);
};
// Create the model and expose it to app
module.exports.Client = mongoose.model('Client', ClientSchema);
module.exports.AccessToken = mongoose.model('AccessToken', AccessTokenSchema);
module.exports.RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
