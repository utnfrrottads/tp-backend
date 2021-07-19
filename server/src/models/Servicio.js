const { Schema, model } = require('mongoose');

const servicioSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true
    },
    idCategoria: {
        type: String,
        required: true
    },
    idUsuario: {
        type: String,
        required: true
    }
}, { timestamps: false });

module.exports = model('Servicio', servicioSchema);
