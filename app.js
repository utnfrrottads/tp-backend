"use strict";
// require express and routes
const express = require("express");
const cors = require('cors');

//start app as express
const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cors
app.use(cors({ credentials: true, origin: true }));

module.exports = app;