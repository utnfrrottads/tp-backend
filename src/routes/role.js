"use strict";
let express = require("express");
let controller = require("../controllers/role");

let router = express.Router();

router.get("", controller.getRoles);
router.get("/:id/", controller.getRole);
router.post("/", controller.createRole);
router.delete("/:id/", controller.deleteRole);
router.put("/:id/", controller.updateRole);

module.exports = router;
