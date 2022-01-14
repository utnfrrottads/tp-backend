const { Schema, model } = require('mongoose');

const notificacionSchema = new Schema({
    descripcion: {
      type: String,
      required: true,
      trim: true,
      maxLength: 400,
    },
    link: {
      type: String,
      required: true,
    },
    fechaHora: {
      type: Date,
      required: true,
    },
    leida: {
      type: Boolean,
      default: false,
      required: true,
    },
    icono: {
      type: String,
      required: true,
    },
    idUsuario: {
      type: String,
      required: true,
    }
}, { collection: 'notificaciones', timestamps: false });

module.exports = model('Notificacion', notificacionSchema);
