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
    rankedSolo: {
        type: Schema.Types.ObjectId,
        ref: 'Ranked'
    },
    rankedFlex: {
        type: Schema.Types.ObjectId,
        ref: 'Ranked'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Summoner", SummonerSchema);