const { Schema, model } = require('mongoose');

const categoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 25
    }
}, { timestamps: false });

module.exports = model('Categoria', categoriaSchema);
