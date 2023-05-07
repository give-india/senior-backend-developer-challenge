const oauth2orize = require('oauth2orize'),
    passport = require('passport'),
    crypto = require('crypto'),
    async = require('async');
// Models
const User = require('../../app/models/user').User;
const Client = require('../../app/models/client').Client;
const AccessToken = require('../../app/models/client').AccessToken;
const RefreshToken = require('../../app/models/client').RefreshToken;
// Create OAuth 2.0 server
const server = oauth2orize.createServer();
// Exchange username and password for access token
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
    User.findOne({email: username}).then((user) => {
        if (!user) {
            return done(null, false);
        }
        if (!user.validPassword(password)) {
            return done(null, false);
        }
        // Delete previous tokens
        async.parallel([
            function(callback) {
                AccessToken.deleteOne({userId: user._id, clientId: client.clientId}).then(() => {
                    callback();
                }).catch((err) => {
                    return done(err);
                });
            },
            function(callback) {
                RefreshToken.deleteOne({userId: user._id, clientId: client.clientId}).then(() => {
                    callback();
                }).catch((err) => {
                    return done(err);
                });
            }
        ], function(err) {
            if (!err) {
                // Create new tokens
                const accessTokenValue = crypto.randomBytes(32).toString('base64');
                const refreshTokenValue = crypto.randomBytes(32).toString('base64');
                const accessToken = new AccessToken({
                    token: accessTokenValue,
                    clientId: client.clientId,
                    userId: user._id
                });
                const refreshToken = new RefreshToken({
                    token: refreshTokenValue,
                    clientId: client.clientId,
                    userId: user._id
                });
                accessToken.save().then(() => {
                    refreshToken.save().then(() => {
                        done(null, accessTokenValue, refreshTokenValue, {'expires_in': 360000});
                    }).catch((err) => {
                        return done(err);
                    });
                }).catch((err) => {
                    return done(err);
                });
            }
        });
    }).catch((err) => {
        return done(err);
    });
}));
// Exchange refreshToken for an access token
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    RefreshToken.findOne({token: refreshToken, clientId: client.clientId}).then((token) => {
        if (!token) {
            return done(null, false);
        }
        User.findById(token.userId).then((user) => {
            if (!user) {
                return done(null, false);
            }
            // Delete previous tokens
            async.parallel([
                function(callback) {
                    AccessToken.deleteOne({userId: user._id, clientId: client.clientId}).then(() => {
                        callback();
                    }).catch((err) => {
                        return done(err);
                    });
                },
                function(callback) {
                    RefreshToken.deleteOne({userId: user._id, clientId: client.clientId}).then(() => {
                        callback();
                    }).catch((err) => {
                        return done(err);
                    });
                }
            ], function(err) {
                if (!err) {
                    // Create new tokens
                    const accessTokenValue = crypto.randomBytes(32).toString('base64');
                    const refreshTokenValue = crypto.randomBytes(32).toString('base64');
                    const accessToken = new AccessToken({
                        token: accessTokenValue,
                        clientId: client.clientId,
                        userId: user._id
                    });
                    const refreshToken = new RefreshToken({
                        token: refreshTokenValue,
                        clientId: client.clientId,
                        userId: user._id
                    });
                    accessToken.save().then(() => {
                        refreshToken.save().then(() => {
                            done(null, accessTokenValue, refreshTokenValue, {'expires_in': 360000});
                        }).catch((err) => {
                            return done(err);
                        });
                    }).catch((err) => {
                        return done(err);
                    });
                }
            });
        }).catch((err) => {
            return done(err);
        });
    }).catch((err) => {
        return done(err);
    });
}));
// Token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
    server.token(),
    server.errorHandler()
]
