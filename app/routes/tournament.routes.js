const { Router } = require("express");
const router = Router();
const tournamentController = require("../controllers/tournament.controller");
const  {verifyToken} = require("../middlewares/verifyToken");

router.get("/", tournamentController.findAll )

router.post("/", verifyToken, tournamentController.create );

router.put("/:id", verifyToken, tournamentController.update );

router.get("/:id",tournamentController.findOne );

router.delete("/:id", verifyToken, tournamentController.delete );

router.get("/:id/add/:name", tournamentController.addParticipant );

module.exports = router;