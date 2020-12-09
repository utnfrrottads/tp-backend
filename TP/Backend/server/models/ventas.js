const mongoose = require ('mongoose');
const { Schema } = mongoose;

const VentaSchema = new Schema({
    idComprador: { type: Schema.Types.ObjectId, ref: 'User', required:true },
    productos: [{
        producto: { type: Object, required: true },          
        cantidad: { type: Number }
      }],
    fecha: { type: Date, required: false},
    comisionista: { type: Object, required: false },
    
})

module.exports = mongoose.model('Venta', VentaSchema);

