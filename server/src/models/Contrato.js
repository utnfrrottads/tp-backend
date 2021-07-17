const { Schema, model } = require('mongoose');

const contratoSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaCancelacion: {
        type: Date,
        default: null
    },
    idServicio: {
        type: String,
        required: true
    },
    idUsuario: {
        type: String,
        required: true
    }
}, { collection: 'contratos', timestamps: false });

module.exports = model('Contrato', contratoSchema);
