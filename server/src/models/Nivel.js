const { Schema, model } = require('mongoose');

const nivelSchema = new Schema({
    nro: {
        type: Number,
        required: true,
        unique: true,
        min: 1
    },
    contratosMinimos: {
        type: Number,
        required: true,
        unique: true,
        min: 0
    }
}, { collection: 'niveles', timestamps: false });

module.exports = model('Nivel', nivelSchema);
