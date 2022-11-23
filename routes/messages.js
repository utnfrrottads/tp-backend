const express = require("express");
const router = express.Router();

const {
  getAllMessages,
  getMessageById,
  createNewMessage,
  deleteMessage,
  updateMessage,
  getAllByUser,
  getAllArchived,
  archiveMessage,
  getFilterMessages,
} = require("../controller/messages");

router.route("/").get(getAllMessages).post(createNewMessage);

router
  .route("/:id")
  .get(getMessageById)
  .delete(deleteMessage)
  .patch(updateMessage);

// Corregir para AD:
// Hay que convertir en una sola ruta filter y que en cada caso de ejeplo de URL se haga tal o cual cosa

// /filter?date=:date
// /filter?sender=:id
// /filter?receiver=:id
///filter?sender=:id&receiver=:id&date=:date
router.route("/filters/test").get(getFilterMessages);

// UF
router.route("/filter/:id").get(getAllByUser);

// UF
router.route("/archived/:id").get(getAllArchived).post(archiveMessage);

module.exports = router;
