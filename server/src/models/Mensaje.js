const { Schema, model } = require('mongoose');

const mensajeSchema = new Schema({
    mensaje: {
        type: String,
        required: true,
    },
    mensajeEnviadoPorOferente: {
        type: Boolean,
        required: true,
    },
    fechaHoraEnvio: {
        type: Date,
        required: true,
    },
    idContrato: {
        type: String,
        required: true,
    }
}, { collection: 'mensajes', timestamps: false });

module.exports = model('Mensaje', mensajeSchema);