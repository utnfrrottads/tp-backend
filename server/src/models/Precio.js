const { Schema, model } = require("mongoose");

const precioSchema = new Schema(
  {
    valor: {
      type: Number,
      required: true,
    },
    idMoneda: {
      type: String,
      required: true,
    },
  },
  { collection: "categorias", timestamps: false }
);

module.exports = model("Precio", precioSchema);
