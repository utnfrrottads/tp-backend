const { Schema, model } = require('mongoose');

const nivelSchema = new Schema({
    contratosMinimos: {
        type: Number,
        required: true,
        unique: true
    }
}, { timestamps: false });

module.exports = model('Nivel', nivelSchema);
