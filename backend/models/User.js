const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  id: String,
  name: String,
  username: String,
  name: String,
  password: String,
  email: String,
  createdAt: String,
})

module.exports = model('User', userSchema)
