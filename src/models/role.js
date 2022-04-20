const mongoose = require("mongoose");

var roleSchema = new mongoose.Schema(
  {
    description: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("role", roleSchema);