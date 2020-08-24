const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");


router.get("/", controller.getUsers);
router.post("/login", controller.login);
router.get('/:id', controller.getUser);
router.post('/', controller.createUser);
router.put('/:id', controller.editUser);
router.delete('/:id', controller.deleteUser);


module.exports = router;
