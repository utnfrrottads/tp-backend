
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({       
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 40, 
      },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40, 
      },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40, 
      },
    password: {
        type: String,
        required: true,
        maxlength: 40, 
      },
      status: {
        type: Boolean,
        required: true,
        default: true,
      },
    }
  );

    module.exports = mongoose.model('users', UserSchema)
