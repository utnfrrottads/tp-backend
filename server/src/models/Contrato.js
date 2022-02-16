const { Schema, model } = require('mongoose');

const contratoSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
    },
    contratoCanceladoPorOferente: {
        type: Boolean,
        default: null,
    },
    fechaCancelacion: {
        type: Date,
        default: null,
    },
    idServicio: {
        type: String,
        required: true,
    },
    idUsuario: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        default: "Contratado",
    },
    calificacion: {
        type: Number,
        default: null,
    }
}, { collection: 'contratos', timestamps: false });

module.exports = model('Contrato', contratoSchema);