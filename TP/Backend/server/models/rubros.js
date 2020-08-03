const mongoose = require ('mongoose');
const { Schema } = mongoose;

const RubroSchema = new Schema({
    descripcion: { type: String, required: true},
})

module.exports = mongoose.model('Rubro', RubroSchema);