var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var about = require('./routes/about');
var offers = require('./routes/offers');
var pay = require('./routes/pay');
var recharge = require('./routes/recharge');
var contact = require('./routes/contact');
var auth = require('./routes/auth');
var profile = require('./routes/profile');
var dataUsage = require('./routes/dataUsage');
var myaccount = require('./routes/myaccount');
var services = require('./routes/services');
var admin = require('./routes/testing/admin');

var app = express();
app.locals.envelope = '';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'gggHEFGHerYhda', saveUninitialized: true, resave: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/about', about);
app.use('/offers', offers);
app.use('/pay', pay);
app.use('/recharge', recharge);
app.use('/contact', contact);
app.use('/auth', auth);
app.use('/profile', profile);
app.use('/dataUsage', dataUsage);
app.use('/myaccount', myaccount);
app.use('/services', services);
app.use('/check/admin/', admin);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
