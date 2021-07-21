const { Schema, model } = require('mongoose');

const monedaSchema = new Schema({
    tag: {
        type: String,
        required: true,
        unique: true,
    }
}, { collection: 'monedas', timestamps: false });

module.exports = model('Moneda', monedaSchema);