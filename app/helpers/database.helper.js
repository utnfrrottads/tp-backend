const mongoose = require("mongoose");
const League = require("../models/League");

const leagues = [
    {
        "tier": 1,
        "name": "CHALLENGER"
    },
    {
        "tier": 2,
        "name": "GRANDMASTER"
    },
    {
        "tier": 3,
        "name": "MASTER"
    },
    {
        "tier": 4,
        "name": "DIAMOND"
    },
    {
        "tier": 5,
        "name": "PLATINUM"
    },
    {
        "tier": 6,
        "name": "GOLD"
    },
    {
        "tier": 7,
        "name": "SILVER"
    },
    {
        "tier": 8,
        "name": "BRONZE"
    },
    {
        "tier": 9,
        "name": "IRON"
    },
]

exports.resetDatabase = async (req, res) => {
    mongoose.connection.dropCollection("leagues");
    // mongoose.connection.dropDatabase();
    for (const element of leagues) {
        let league = new League({
            tier: element.tier,
            name: element.name
        });

        await league.save();
    }
    console.log("Database loaded");
    // leagues.forEach(element => {

    //     let league = new League({
    //         tier: element.tier,
    //         name: element.name
    //     });

    //     await League.save(league);
    // });
}

