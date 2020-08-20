const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  usuario: { type: String, required: true },
  pass: { type: String, required: true },
  tipo: { type: String, required: true },
  cuil: { type: String, required: false },
  nombre: { type: String, required: true },
  localidad: { type: String, required: false },
  telefono: { type: String, required: false },
  mail: { type: String, required: false },
  url: { type: String, required: false },
});

module.exports = mongoose.model("User", UserSchema);
