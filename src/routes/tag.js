"use strict";
let express = require("express");
let controller = require("../controllers/tag");
let { verifyMongooseID, verifyTag } = require('../middlewares/index');

let router = express.Router();

router.get("/", controller.getTags);
router.get("/:id", verifyMongooseID, controller.getTag);
router.post("/", verifyTag, controller.createTag);
router.delete("/:id", verifyMongooseID ,controller.deleteTag);
router.put("/:id", verifyMongooseID, verifyTag ,controller.updateTag);

module.exports = router;
