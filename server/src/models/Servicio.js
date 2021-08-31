const { Schema, model } = require("mongoose");

const servicioSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
    maxLength: 300,
  },
  precio: {
    valor: {
      type: Number,
      required: true,
      min: 0,
    },
    idMoneda: {
      type: String,
      required: true,
    },
  },
  ubicacion: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  fechaHoraPublicacion: {
    type: Date,
    required: true,
  },
  idCategoria: {
    type: String,
    required: true,
  },
  idUsuario: {
    type: String,
    required: true,
  },
}, { collection: "servicios", timestamps: false });

module.exports = model("Servicio", servicioSchema);
