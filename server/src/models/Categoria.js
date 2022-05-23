const { Schema, model } = require('mongoose');

const categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        maxLength: 30
    }
}, { collection: 'categorias', timestamps: false });

module.exports = model('Categoria', categoriaSchema);
