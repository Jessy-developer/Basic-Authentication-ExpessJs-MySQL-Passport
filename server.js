var express = require('express')
var app = express()
var path = require('path')
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').load()
var exphbs = require('express-handlebars')

var index = require('./app/routes/index');

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(express.static(path.join(__dirname, './app/public')));

//For Handlebars
app.set('views', './app/views')
app.set('layout', './app/views')
app.engine('.hbs', exphbs({ 
    extname: '.hbs',
    layoutsDir:'./app/views/layouts',
}));
app.set('view engine', '.hbs');
app.use('/', index);

app.set('view engine', '.hbs');

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

app.listen(5000, function (err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;