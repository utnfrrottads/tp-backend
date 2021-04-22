const { model, Schema } = require('mongoose');

const patientSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  token: String,
  birthDate: String,
  createdAt: String,
  weight: Number,
  bodyMassIndex: Number,
  fatPercentage: Number,
  nutritionistId: {
    type: Schema.Types.ObjectId,
    ref: 'nutritionists'
  }
});

module.exports = model('Patient', patientSchema);
