const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const messagesRouter = require("./messages");
const friendRouter = require("./friendList");

router.use("/api/v1/users", usersRouter);
router.use("/api/v1/messages", messagesRouter);
router.use("/api/v1/friendList", friendRouter);

module.exports = router;
