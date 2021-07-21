const { Schema, model } = require("mongoose");

const servicioSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 300,
    },
    descripcion: {
      type: String,
      required: true,
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
    idCategoria: {
      type: String,
      required: true,
    },
    idUsuario: {
      type: String,
      required: true,
    },
  },
  { collection: "servicios", timestamps: false }
);

module.exports = model("Servicio", servicioSchema);
