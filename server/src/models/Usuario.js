const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombreUsuario: {
        type: String,
        required: true,
        unique: true
    },
    clave: {
        type: String,
        required: true,
        select: false
    },
    nombreApellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    habilidades: {
        type: String
    },
    idNivel: {
        type: String,
        //required: true
    }
}, { timestamps: false });

module.exports = model('Usuario', usuarioSchema);
