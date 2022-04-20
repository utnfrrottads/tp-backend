"use strict";
let express = require("express");
let role = require("./role");
let user = require("./user");

let router = express.Router();

router.use('/roles', role);
router.use('/users', user);

module.exports = router;
