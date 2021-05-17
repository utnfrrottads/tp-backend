const { Schema, model } = require('mongoose');

const contratoSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaCancelacion: {
        type: Date
    },
    idServicio: {
        type: String,
        required: true
    },
    idUsuario: {
        type: String,
        required: true
    }
}, { timestamps: false });

module.exports = model('Contrato', contratoSchema);
