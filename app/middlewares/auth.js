// Check authentication
const passport = require('passport');
// Is bearer authenticated
exports.isAuthenticated = passport.authenticate('bearer', {
    session: false
});
