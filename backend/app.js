//  IMPORTS -- EXTERNAL
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const { ValidationError } = require('sequelize');
const cookieParser = require('cookie-parser');

//  IMPORTS -- INTERNAL
const { environment } = require('./config');
const { production } = require('./config/database');
const isProduction = environment === 'production';
const routes = require('./routes');

//  INITIALIZE APP
const app = express();

//  USE GLOBAL MIDDLEWARE
app.use(morgan('dev')); // Logger
app.use(cookieParser());
app.use(express.json()) // Converts req json to parsed POJO

if(!isProduction) {
    app.use(cors());
}

app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}));

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

//  ROUTES
app.use(routes);

//  ERROR HANDLING MIDDLEWARE
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

  app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });

  app.use((err, _req, res, _next) => {
    console.log(res.status);
    res.status(err.status || 500);
    console.error(err);

    let opt = isProduction ? {stack: err.stack} : {}
    if (err.title === 'Login failed') {
      return res.json({
        message: err.errors.message,
        ...opt
      });
    }
    res.json({
      // title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      ...opt
    });
  });
//  EXPORTS

module.exports = app;
