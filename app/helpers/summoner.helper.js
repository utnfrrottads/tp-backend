require("dotenv").config({ path: "../../.env" });
const axios = require("axios");

const Summoner = require("../models/Summoner");
const League = require("../models/League");
const Ranked = require("../models/Ranked");

const axiosOptions = {
    headers: {
        "X-Riot-Token": process.env.API_TOKEN
    }
}

exports.findSummonerByNameLOLAPI = async (summonerName) => {

    const summonerApiResponse = await axios.get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key${process.env.API_TOKEN}`, axiosOptions)
        .catch(e => {
            return res.status(e.response.status).json(e.response.data);
        });

    const { id, name, summonerLevel } = summonerApiResponse.data;
    let summoner = new Summoner({
        summonerId: id,
        summonerName: name,
        summonerLevel: summonerLevel
    });

    const rankedApiResponse = await axios.get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${id}?api_key${process.env.API_TOKEN}`, axiosOptions)
        .catch(e => {
            return res.status(e.response.status).json(e.response.data);
        });

    let rankeds = rankedApiResponse.data;
    for (const element of rankeds) {
        let ranked = new Ranked({
            queueType: element.queueType,
            rank: element.rank,
            wins: element.wins,
            losses: element.losses,
            leaguePoints: element.leaguePoints,
            tier: element.tier
        })
        if (element.queueType === "RANKED_SOLO_5x5") {
            summoner.rankedSolo = ranked;
        } else if (element.queueType === "RANKED_FLEX_SR") {
            summoner.rankedFlex = ranked;
        }
        await ranked.save();
        // summoner.leagues.push(ranked);
    }
    await summoner.save();
    return summoner;
}

const findLeagueByName = async name => {
    console.log(name);
    const league = await League.findOne({ name: name });
    console.log(league);
    return league;
}