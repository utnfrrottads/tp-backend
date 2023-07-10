const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const messagesRouter = require("./messages");
const friendRouter = require("./friendList");
const authRouter = require('./auth')

// router.use("/api/v1/auth", authRouter)


// Middleware
router.use("/api/v1/users", usersRouter);
router.use("/api/v1/messages", messagesRouter);
router.use("/api/v1/friendList", friendRouter);
router.use("/auth", authRouter)

module.exports = router;
