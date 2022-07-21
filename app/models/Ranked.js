const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RankedSchema = Schema({
    queueType: {
        type: String,
        required: true
    },
    tier: {
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
    leaguePoints: {
        type: Number,
        required: true
    },
    summoner: {
        type: Schema.Types.ObjectId,
        ref: 'Summoner'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Ranked", RankedSchema);