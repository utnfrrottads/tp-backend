const mongoose = require('mongoose');

const {Schema , model} = mongoose;

const AppointmentSchema = new Schema({
    date:{type:Date, required: true},
    state:{type:String, required: true,default:'Reserved'},
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    field:{type:Schema.Types.ObjectId,ref:'Field',required:true},
},{collection:'appoinments'})

//ESTO LO HACE BIEN??
AppointmentSchema.index({ date: 1, field: 1 }, { unique: true })

AppointmentSchema.method('toJSON',function(){
    const {__v,_id, ...object}=this.toObject();
    object.id = _id;
    return object;
})

module.exports= model('Appointment',AppointmentSchema);
