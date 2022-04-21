const mongoose = require("mongoose");

var tagSchema = new mongoose.Schema(
  {
    description: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tag", tagSchema);