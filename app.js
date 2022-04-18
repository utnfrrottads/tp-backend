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


require("./src/models/role");
// bind api and routes
const routes = require("./src/routes/");
const roleRoutes = require("./src/routes/role");
app.use("/api", routes);
app.use("/api/roles", roleRoutes);

module.exports = app;
