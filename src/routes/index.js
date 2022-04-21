"use strict";
let express = require("express");
let role = require("./role");
let user = require("./user");
let tag = require('./tag');

let router = express.Router();

router.use('/roles', role);
router.use('/users', user);
router.use("/tags", tag);

module.exports = router;
