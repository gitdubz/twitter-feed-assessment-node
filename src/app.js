const express = require('express');
const logger = require('morgan');
const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv');
const debug = process.env.NODE_ENV === 'develop';

/* Mount environment variables */
dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});

/* App Setup */
const app = express();
app.set('trust proxy', true);
app.set('origin', process.env.ORIGIN || 'localhost');
app.set('port', process.env.PORT || 2001);
app.set('debug', process.env.NODE_ENV !== 'production');

/* Middleware */
app.use(helmet());
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('combined'));
}

/* Route Controllers */
const feed = require('./routes/feed');

/* Routes */
app.use('', feed);

/* Handle 404 routes */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* Ensure json response for errors */
app.use((err, req, res, next) => {
  if (debug) {
    console.log(err);
  }

  res.status(err.status || 500);

  res.json({
    status: 'error',
    message: err
  });
});

module.exports = app;
