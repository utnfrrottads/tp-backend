const { Schema, model } = require('mongoose');

const servicioSchema = new Schema({
    descripcion: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 300
    },
    precio: {
        valor: {
            type: Number,
            required: true,
            min: 0
        },
        moneda: {
            type: String,
            required: true,
            maxLength: 10
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
}, { collection: 'servicios', timestamps: false });

module.exports = model('Servicio', servicioSchema);
