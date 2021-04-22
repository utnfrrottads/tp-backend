const { model, Schema } = require('mongoose')

const attentionRequestSchema = new Schema({
  nutritionistId: {
    type: Schema.Types.ObjectId,
    ref: 'nutritionists'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  state: String,
  createdAt: String
})

module.exports = model('AttentionRequest', attentionRequestSchema)
