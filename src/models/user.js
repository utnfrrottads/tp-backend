const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    imageUrl: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: mongoose.SchemaTypes.ObjectId, ref: "role" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);