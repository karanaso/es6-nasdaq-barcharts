"use strict";

let express = require('express');
let app = express();

process.env.PORT = 3000;

app.use('/',express.static( __dirname + '/../dist'));
module.exports = app;
