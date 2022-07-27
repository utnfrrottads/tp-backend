const { Router } = require("express");
const router = Router();

const summonerController = require("../controllers/summoner.controller");

router.get("/:summonerName", summonerController.summoner);

module.exports = router;