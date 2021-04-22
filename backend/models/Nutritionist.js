const { model, Schema } = require('mongoose');

const nutritionistSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  birthDate: String,
  createdAt: String,
  patients: [{
    type: Schema.Types.ObjectId,
    ref: 'patients'
  }],
  attentionRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]
});

module.exports = model('Nutritionist', nutritionistSchema)
