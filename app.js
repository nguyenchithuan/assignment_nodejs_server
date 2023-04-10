var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeRouter = require('./routes/home.route');
var settingsRouter = require('./routes/settings.route');
var accountsRouter = require('./routes/accounts.route');
var productsRouter = require('./routes/products.route');
var categorysRouter = require('./routes/categorys.route');
var productApiRouter = require('./routes/api/productsApi.router');
var accountApiRouter = require('./routes/api/accoutsApi.router');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'NHKDNGHaksfsndfhaiserkndv834be23sdhf21gsb',
  resave: false,
  saveUninitialized: true 
 }));
 


app.use('/', homeRouter);
app.use('/settings', settingsRouter);
app.use('/accounts', accountsRouter);
app.use('/products', productsRouter);
app.use('/categorys', categorysRouter);
app.use('/api', productApiRouter);
app.use('/api', accountApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
  if (req.originalUrl.indexOf('/api') == 0) {
    res.json(
      {
        status: 0,
        msg: err.message
      }
    );
  } else {
    res.render('error');
  }
});


console.log('http://localhost:3000');

module.exports = app;
