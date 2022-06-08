const StatusCodes = require("http-status-codes");
const Message = require('../models/Message')



const getAllMessages = async (req, res)=>{
    
    try{
        const messages = await Message.find({});
        return res.status(StatusCodes.OK).json({messages})
    }
    catch(err){
        return res.status(StatusCodes.NOT_FOUND).json({msg: err})
    }


}



const getMessageById = async(req, res) =>{
    try{
        const {id} = req.params;
        
        const message =  await Message.find({_id: id})
        return res.status(StatusCodes.OK).json({message})
    }catch(err){
        return res.status(StatusCodes.NOT_FOUND).json({msg:err})
    }

}


const createNewMessage = async(req, res)=>{
    try{
        const {description, sender, receiver} = req.body;
        const date = new Date().toISOString();

        
        const message = await new Message({description: description, date: date, sender_id: sender, receiver_id: receiver})

        const newMessage = await message.save()

        return res.status(StatusCodes.OK).json({newMessage})
    }
    catch(err){
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({msg:err})
    }
}


const updateMessage = async(req, res) =>{
    try{
        const {desc} = req.body;
        const {id} = req.params;

        if( desc === ""){
            return res
            .status(StatusCodes.CONFLICT)
            .json({msg:"Message should not be empty"})
        }


        const message = await Message.findByIdAndUpdate({_id: id}, {date:new Date(today)})

        if (!message){
            return res
            .status(StatusCodes.NOT_FOUND)
            .json({msg: "ID Not Found"})
        }

        return res
        .status(StatusCodes.OK)
        .json({message})

    }catch(err){
       return console.log(err)
    }

}


const deleteMessage = async(req, res) =>{
    try{
        const {id} = req.params;
        const deleteMessage =  await Message.findByIdAndRemove(id)
        return res
        .status(StatusCodes.OK)
        .json({ deleteMessage });
    }
    catch(error){
        return res
      .status(StatusCodes.NOT_IMPLEMENTED)
      .json({ msg:error });
    }

}

const getMessageByDate = async (req, res) =>{ // Ver forma de nombrar
    try{
        let {from_date, to_date} = req.body;

        if(to_date === ""){
            to_date = new Date().toISOString()
        }
        
        

        // Que pasa si fecha from nula?
        // Deberia ingresarla en formato normal y buscarla en el iso??
        // const f_date = new Date(from_date)
        // const t_date = new Date(to_date) ==> Mirar
        const messages = await Message.find({date:{"$gte": from_date, "$lt": to_date}})

        return res.status(StatusCodes.OK).json({messages})

    }catch(err)
    {
        return res
        .status(StatusCodes.NOT_FOUND)
        .json({msg: err})
    }
} 


const getBySender = async(req, res) =>{
    try{
        let {sender} = req.body;

        
        const messages = await Message.find({sender_id: sender})

        return res.status(StatusCodes.OK).json({messages})

    }catch(err)
    {
        return res.status(StatusCodes.NOT_FOUND).json({msg:err})
    }

}


const getByReceiver = async(req, res) =>{
    try{
        let {receiver} = req.body;

        
        const messages = await Message.find({receiver_id: receiver})

        return res.status(StatusCodes.OK).json({messages})

    }catch(err)
    {
        return res.status(StatusCodes.NOT_FOUND).json({msg:err})
    }

}


module.exports = {
    getAllMessages,
    getMessageById,
    createNewMessage,
    deleteMessage,
    updateMessage,
    getMessageByDate,
    getBySender,
    getByReceiver
}