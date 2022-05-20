
const Message = require('../models/Message')



const getAllMessages = async (req, res)=>{
    
    try{
        const messages = await Message.find({});
        return res.status(200).json({messages})
    }
    catch(err){
        return res.status(404).json({msg: err})
    }


}



const getMessageById = async(req, res) =>{
    try{
        const {id} = req.params;
        
        const message =  await Message.find({_id: id})
        return res.status(200).json({message})
    }catch(err){
        return res.status(404).json({msg:err})
    }

}


const createNewMessage = async(req, res)=>{
    try{
        const {desc} = req.query;
        const date = new Date();
        const message = await new Message({description: desc, date: date})

       const newMessage = await message.save(function (err, message) {
            if (err) return console.error(err);
            console.log(message.description + " saved to bookstore collection.");
          });
        return res.status(200).json({newMessage})
    }
    catch(err){
        console.log(err);
    }
}



const deleteMessage = async(req, res) =>{
    try{
        const {id} = req.params;
        const deleteMessage =  await Message.findByIdAndRemove(id)
        return res.status(200).json({ deleteMessage });
    }
    catch(error){
        console.log(error)
    }

}


module.exports = {
    getAllMessages,
    getMessageById,
    createNewMessage,
    deleteMessage
}