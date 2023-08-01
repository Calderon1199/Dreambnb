//  IMPORTS -- EXTERNAL
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
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

//  EXPORTS

module.exports = app;
