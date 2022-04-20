"use strict";
// require express and routes
const express = require("express");
const cors = require('cors');

const routes = require('./src/routes/index');

//start app as express
const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cors
app.use(cors({ credentials: true, origin: true }));

app.use("/api", routes);

module.exports = app;