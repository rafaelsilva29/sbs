var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');

mongoose.connect('mongodb://127.0.0.1:27017/eatNow', {userNewUrlParser: true, useUnitifiedTopology: true})
        .then(() => console.log('> Mongo ready: ' + mongoose.connection.readyState))
        .catch((erro) => console.log('> Mongo: erro na conexão: ' + erro))


// ------------ API ROUTES -------------- //
var cuisineStylesAPI = require('./routes/api/cuisineStyles');
var restaurantsAPI = require('./routes/api/restaurants');
var recommendationPerUserAPI = require('./routes/api/recommendationPerUsers');
var recommendationContentAPI = require('./routes/api/recommendationContents');
var recommendationsAPI = require('./routes/api/recommendations');
var usersAPI = require('./routes/api/users');
var reviewsAPI = require('./routes/api/reviews');
var adminAPI = require('./routes/api/admin');
// --------------------------------------- //

// ------------ FRONT-END ROUTES -------------- //
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var singleRestaurantRouter = require('./routes/single-restaurant');
var exploreRouter = require('./routes/explore');
var contactRouter = require('./routes/contact');
var newsRouter = require('./routes/news');
// -------------------------------------------- //

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ------------ API ROUTES -------------- //
app.use('/api/cuisineStyles', cuisineStylesAPI);
app.use('/api/restaurants', restaurantsAPI);
app.use('/api/admin', adminAPI);
app.use('/api/users', usersAPI);
app.use('/api/reviews', reviewsAPI);
app.use('/api/recommendationPerUsers', recommendationPerUserAPI);
app.use('/api/recommendationContents', recommendationContentAPI);
app.use('/api/recommendations', recommendationsAPI);
// --------------------------------------- //

// ------------ FRONT-END ROUTES -------------- //
app.use('/', indexRouter);
app.use('/restaurant', singleRestaurantRouter);
app.use('/explore', exploreRouter);
app.use('/contact', contactRouter);
app.use('/news', newsRouter);
app.use('/users', usersRouter);
// -------------------------------------------- //

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
