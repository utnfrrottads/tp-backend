require("dotenv").config({ path: "../../.env" });

const Summoner = require("../models/Summoner");
const League = require("../models/League");
const SummonerHelper = require("../helpers/summoner.helper");

exports.summoner = async (req, res) => {

    const { summonerName } = req.params;

    let summoner = await Summoner.findOne({ summonerName: summonerName }).populate("rankedSolo").populate("rankedFlex");
    let msg = "Summoner encontrado";
    if (!summoner) {
        summoner = await SummonerHelper.findSummonerByNameLOLAPI(summonerName);
        msg = "Summoner agregado";
    }
    return res.status(200).json({ msg, summoner });
}