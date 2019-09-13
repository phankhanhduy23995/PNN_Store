const express = require('express');
const path = require('path');
const log4js = require('log4js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const loggerMorgan = require('morgan');
const auth_utils = require('./lib/auth_utils');

// [SH] Bring in the data model
require('./models/db');
// [SH] Bring in the routes for the API (delete the default routes)
const users_routes = require('./routes/user_routes');
const category_routes = require('./routes/category_routes');

const app = express();

app.use(loggerMorgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Setup routes
 */
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to the default API route' }));
app.use('/users', auth_utils.authorizeHeader, users_routes);
app.use('/categories', auth_utils.authorizeHeader, category_routes);

/**
 * Setup logger
 */
const logger = log4js.getLogger('http');
app.use(log4js.connectLogger(logger));

/**
 * Catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * no stacktraces leaked to user
 */
app.use(function (err, req, res) {
  res.status(err.status || 500)
    .json({
      success: false,
      message: err.message,
      code: err.status
    });
});

module.exports = app;
