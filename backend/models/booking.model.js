const mongoose = require('mongoose');

const {Schema , model} = mongoose;

const BookingSchema = new Schema({
    date:{type:Date, required: true},
   //COMO VA EL ESTADO DEFAULT state:{type:String, required: true,default:'Pendient'},
    // como pongo la hora? como date o como number?? startTime:{type:Date, required: true},
    //como pongo la hora? como date o como number ?? y esta bien eso de startime+1?? 
    //endTime:{type:String,default: startTime +1},
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    field:{type:Schema.Types.ObjectId,ref:'Field',required:true},
},{collection:'booking'})

UsuarioSchema.method('toJSON',function(){
    const {__v,_id, ...object}=this.toObject();
    object.uid = _id;
    return object;
})

module.exports= model('Booking',BookingSchema);
