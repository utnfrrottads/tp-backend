"use strict";
let express = require("express");
let controller = require("../controllers/index");

let router = express.Router();

router.use('/roles', controller.role);
router.use('/users', controller.user);

module.exports = router;
