import mongoose, { Schema } from 'mongoose';

const providerModel = new Schema(
  {
    cuit: {
      type: String,
      match: /^([0-9]{11}|[0-9]{2}-[0-9]{8}-[0-9]{1})$/g,
      required: true,
    },
    adress: { type: String },
    businessName: { type: String, required: true },
    phoneNumber: { type: String },
  },
);

module.exports = mongoose.model('Provider', providerModel);
