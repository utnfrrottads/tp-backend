const express = require("express");
const router = express.Router();
const upload = require("../middlewares/storage");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

router.route("/").get(getAllUsers);
router.route("/create").post(upload.single("file")).post(createUser);
router.route("/:id").patch(updateUser).delete(deleteUser);

module.exports = router;
