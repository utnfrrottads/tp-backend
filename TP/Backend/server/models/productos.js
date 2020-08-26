const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  rubro: { type: Object, required: true },
  idVendedor: { type: String, required: true },
  descripcion: { type: String, required: true },
  stock: { type: Number, required: true },
  precio: { type: Number, required: true },
  url: { type: Array, required: true },
});

module.exports = mongoose.model("Producto", ProductoSchema);
