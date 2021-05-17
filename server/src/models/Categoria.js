const { Schema, model } = require('mongoose');

const categoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: false });

module.exports = model('Categoria', categoriaSchema);
