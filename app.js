// requires
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Para manejar los métodos PUT y DELETE con handlebars
const methodOverride = require("method-override");

// requires from routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var autosRouter = require('./routes/autos');
var subirautosRouter = require("./routes/subirautos");

// instances
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// midlewares
app.use(logger('dev'));
app.use(express.json());
// Configurar Body Parser para manejar solicitudes POST
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para sobrescribir el método HTTP
app.use(methodOverride('_method'));

// endpoints
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/autos', autosRouter);
app.use('/subirautos', subirautosRouter);

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
  res.render('error');
});

module.exports = app;