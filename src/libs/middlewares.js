const express = require("express");

module.exports = app => {
    app.set('port', process.env.PORT || 3000);
    app.use(express.json());
};