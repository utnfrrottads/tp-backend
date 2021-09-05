const { Schema, model } = require('mongoose');

const mensajeSchema = new Schema({
    mensaje: {
        type: String,
        required: true,
        maxLength: 400,
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