"use strict";
let express = require("express");
let controller = require("../controllers/index");

let router = express.Router();

router.get("/", controller.home);

module.exports = router;
