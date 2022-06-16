const express = require("express");
const router = express.Router();
const {
  getListByOwner,
  addFriend,
  deleteFriend,
  deleteList,
} = require("../controller/friendList");

router.route("/:ownerId").get(getListByOwner).delete(deleteList);
// Manejo de la lista como coleccion -> Borro la lista, creo una lista, obtengo una lista.
router.route("/:ownerId/:friendId").put(addFriend).delete(deleteFriend);
// Actualizacion de la lista ya creada, agregar un amigo, borrar un amigo.

module.exports = router;
