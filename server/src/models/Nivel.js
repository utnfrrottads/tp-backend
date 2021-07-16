const { Schema, model } = require('mongoose');

const nivelSchema = new Schema({
    contratosMinimos: {
        type: Number,
        required: true,
        unique: true,
        min: 0
    }
}, { timestamps: false });

module.exports = model('Nivel', nivelSchema);
