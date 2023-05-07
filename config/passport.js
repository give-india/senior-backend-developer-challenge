// Passport authentication strategies for API endpoints
const BasicStrategy = require('passport-http').BasicStrategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    Client = require('../app/models/client').Client,
    AccessToken = require('../app/models/client').AccessToken,
    RefreshToken = require('../app/models/client').RefreshToken;
// Load the User model
const User = require('../app/models/user').User;
// Passport strategies
module.exports = function(passport) {
    // Passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // Basic authentication strategy
    passport.use(new BasicStrategy(
        function(username, password, done) {
            Client.findOne({clientId: username}).then((client) => {
                if (!client) {
                    return done(null, false);
                }
                if (!client.validClientSecret(password)) {
                    return done(null, false);
                }
                return done(null, client);
            }).catch((err) => {
                return done(err);
            });
        }
    ));
    // Client password authentication strategy
    passport.use(new ClientPasswordStrategy(
        function(clientId, clientSecret, done) {
            Client.findOne({clientId: clientId}).then((client) => {
                if (!client) {
                    return done(null, false);
                }
                if (!client.validClientSecret(clientSecret)) {
                    return done(null, false);
                }
                return done(null, client);
            }).catch((err) => {
                return done(err);
            });
        }
    ));
    // Bearer authentication strategy
    passport.use(new BearerStrategy(
        function(accessToken, done) {
            AccessToken.findOne({token: accessToken}).then((token) => {
                if (!token) {
                    return done(null, false);
                }
                if (Math.round((Date.now() - token.created_at) / 1000) > 360000) {
                    AccessToken.deleteOne({token: accessToken}).catch((err) => {
                        if (err) return done(err);
                    });
                    return done(null, false, {message: 'Token expired.'});
                }
                User.findById(token.userId).then((user) => {
                    if (!user) {
                        return done(null, false, {message: 'Unknown user.'});
                    }
                    const info = {scope: '*'};
                    done(null, user, info);
                }).catch((err) => {
                    return done(err);
                });
            }).catch((err) => {
                return done(err);
            });
        }
    ));
};
