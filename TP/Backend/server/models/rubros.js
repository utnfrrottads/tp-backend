const mongoose = require ('mongoose');
const { Schema } = mongoose;

const RubroSchema = new Schema({
    descripcion: { type: String, required: true},
    url: { type: String, required: false },
})

module.exports = mongoose.model('Rubro', RubroSchema);