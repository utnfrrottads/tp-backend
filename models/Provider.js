
const mongoose = require('mongoose')
const Schema = mongoose.Schema

    const ProviderSchema = new Schema(
        {
        name: {
            type: String,
            required: true,
          },
        email: {
            type: String,
            require: true,
          },
        addres: {
            type: String,
            required: true,
          },
        state: {
          type: Boolean,
          required: true,
          default: true,
        }
        }
      );

    module.exports = mongoose.model('providers', ProviderSchema)
