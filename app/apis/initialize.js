// API
// Initialize User and Client API
var validator = require('validator'),
    oauth2 = require('../../app/middlewares/oauth2');
// Models
// User
const User = require('../../app/models/user').User;
// Client
const Client = require('../../app/models/client').Client;
// Authentication
const isAuthenticated = require('../../app/middlewares/auth').isAuthenticated;
// Realtime functions
var IO;
// Export all API functions
module.exports = function(app, passport, io) {
    IO = io;
    // Create a user
    app.post('/api/user', function(req, res) {
        if (!req.body.email || !validator.isEmail(req.body.email)) {
            return res.status(400).send({error: "We are expecting a valid email id of the user."});
        }
        if (!req.body.password || req.body.password.length <8) {
            return res.status(400).send({error: "We are expecting a password of length 8 and above."});
        }
        if (!req.body.name) {
            return res.status(400).send({error: "We are expecting a valid name of the user."});
        }
        // New user
        var new_user = new User({
            email: req.body.email,
            name: req.body.name
        });
        // Generate hash of password
        new_user.password = new_user.generateHash(req.body.password);
        // Save
        new_user.save().then(() => {
            res.send(new_user);
        }).catch((err) => {
            return res.sendStatus(400);
        });
    });
    // Create a client
    app.post('/api/client', function(req, res) {
        if (!req.body.name || !req.body.clientId || !req.body.clientSecret || !req.body.redirectURI) {
            return res.status(400).send({error: "We are expecting a client name, client id, client secret and a redirectURI."});
        }
        // New client
        var new_client = new Client({
            name: req.body.name,
            clientId: req.body.clientId,
            redirectURI: req.body.redirectURI
        });
        // Generate hash of clientSecret
        new_client.clientSecret = new_client.generateHash(req.body.clientSecret);
        // Save
        new_client.save().then(() => {
            res.send(new_client);
        }).catch((err) => {
            return res.sendStatus(400);
        });
    });
    // Create access token
    // POST /oauth/token grant_type=password client_id={clientId} client_secret={clientSecret} username={user_email} password={user_password}
    // POST /oauth/token grant_type=refresh_token client_id={clientId} client_secret={clientSecret} refresh_token={refresh_token}
    app.post('/oauth/token', oauth2.token);
    // Check if API is running
    // GET /api -H "Authorization: Bearer {access_token}"
    app.get('/api', isAuthenticated, function(req, res) {
        res.send('API is running');
    });
};
