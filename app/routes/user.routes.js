const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");


router.get("/", userController.findAll )

router.post("/", userController.create );

router.put("/:id", userController.update );

router.get("/:id", userController.findOne );

router.delete("/:id", userController.delete );

router.post("/signin", userController.signin );


module.exports = router;