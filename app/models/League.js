const mongoose = require("mongoose");

const LeagueSchema = mongoose.Schema({
    tier: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("League", LeagueSchema);