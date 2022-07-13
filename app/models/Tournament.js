const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TournamentSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    privado: {
        type: Boolean,
        required: true
    },
    premio: {
        type: String
    },
    cupo: {
        type: Number
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    participantes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Summoner'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Tournament", TournamentSchema);