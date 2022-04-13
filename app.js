"use strict";
// require express and routes
let express = require("express");
let routes = require("./src/routes/");

//start app as express
let app = express();

// bind api and routes
app.use("/api", routes);

module.exports = app;
