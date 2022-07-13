const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SummonerLeagueSchema = Schema({
    queueType: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    summoner: {
        type: Schema.Types.ObjectId,
        ref: 'Summoner'
    },
    league: {
        type: Schema.Types.ObjectId,
        ref: 'League'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("SummonerLeague", SummonerLeagueSchema);