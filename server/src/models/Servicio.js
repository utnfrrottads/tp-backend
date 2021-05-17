const { Schema, model } = require('mongoose');

const servicioSchema = new Schema({
    descripcion: {
        type: String,
        required: true,
        unique: true
    },
    precio: {
        valor: {
            type: Number,
            required: true
        },
        moneda: {
            type: String,
            required: true
        }
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
