
const mongoose = require('mongoose')

const Schema = mongoose.Schema

    const CategorySchema = new Schema(
        {
        code: {      
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 40, 
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 40, 
          },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
          },
        status: {
            type: Boolean,
            required: true,

          },
        }
      );

    module.exports = mongoose.model('categorys', CategorySchema)
