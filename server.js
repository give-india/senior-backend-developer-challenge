// Express server and configurations
const app_root = __dirname,
    express = require('express'),
    fs = require('fs'),
    path = require('path'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    colors = require('colors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    Bluebird = require('bluebird'),
    MongoStore = require('connect-mongo');
// This will allow to load environment
// variables defined in .env file in root directory
require('dotenv').config();
// Instantiate express
const app = express();
// Import database configuration and connect to database
const configDB = require('./config/database');
var urlDB = configDB.url;
if (app.get('env') === 'development') {
    urlDB = configDB.urlDev;
}
// Connect MongoDB to the url defined in config file
mongoose.Promise = Bluebird;
mongoose.connect(urlDB);
// Passport strategies
require('./config/passport')(passport);
// MongoDB Session store - to create and store login sessions
const sessionStore = MongoStore.create({
    mongoUrl: urlDB,
    collectionName: 'sessions' // default
});
// Session middleware
const sessionMiddleware = session({
    name: 'oddbun.sid',
    store: sessionStore,
    secret: 'Sa802u5LH67pPASasAPopLxa9618',
    cookie: {maxAge: 24 * 60 * 60 * 1000},
    resave: false,
    saveUninitialized: true
});
// Basic session and express configuration
// Set port to 8080 or one defined in env variable
app.set('port', process.env.PORT || 8080);
// Serve static files - like image files kept in static directory
app.use(express.static(path.join(app_root, 'static')));
// Logs: create a write stream in append mode
var accessLogStream = fs.createWriteStream(app_root + '/log/app.log', {flags: 'a'});
app.use(morgan('dev', {stream: accessLogStream}));
// Body parser: For accessing values using req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
// Method Override: For PUT and DELETE
app.use(methodOverride());
// Express Session
app.use(cookieParser());
app.use(sessionMiddleware);
// Passport using express sessions - Used for login/reg.
app.use(passport.initialize());
app.use(passport.session());
// Connect flash for flash messages - should be declared after sessions
app.use(flash());
// Socket code - for realtime code
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});
// Start server
server.listen(app.get('port'));
console.log('Express server listening on port: '.magenta+ app.get('port'));
// APIs - Defined in app/apis
require('./app/apis/initialize.js')(app, passport, io);
require('./app/apis/index.js')(app, passport, io);
// Error handling - catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// Error handlers
// Development error handler - print stack trace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });
}
// Production error handler - no stack trace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('Error!');
});
