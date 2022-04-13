"use strict";
// require express and routes
const express = require("express");
const bodyParser = require("body-parser");

//start app as express
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure headesr cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
require("./src/models/role");
// bind api and routes
const routes = require("./src/routes/");
const roleRoutes = require("./src/routes/role");
app.use("/api", routes);
app.use("/api/role", roleRoutes);

module.exports = app;
