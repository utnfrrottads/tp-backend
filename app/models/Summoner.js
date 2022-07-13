const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SummonerSchema = Schema({
    summonerId: {
        type: String,
        required: true
    },
    summonerName: {
        type: String,
        required: true
    },
    summonerLevel: {
        type: Number
    },
    leagues: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SummonerLeague'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Summoner", SummonerSchema);