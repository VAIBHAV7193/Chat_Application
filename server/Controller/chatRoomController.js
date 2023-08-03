
const Chatroom_Model = require('../Model/ChatRoom')
const createChatRoom =  async(req,res)=>{
    try{
    const{name} = req.body;
    if(!name){
        return res.send({message:'chat room name is required'})
    }


    const Chat = await Chatroom_Model.findOne({name})

    if(Chat){
        return res.status(201).send({
            success:false,
            messgae:'Alredy Chat Present'
        })
    };
    const ChatRoom = await Chatroom_Model.create({name});

    ChatRoom.save();
    res.status(201).send({
        success:true,
        messgae:'Chat Room created successfully',
        ChatRoom
    })

    }

catch(err){
    return res.status(500).send({
        success:false,
        messgae:'Error in Creating chat room',
        err
    })
}

};

const getChatRoom = async(req,res)=>{

    try{
        const ChatRoom = await Chatroom_Model.find({});
        
        res.status(200).send({
            success:true,
            message:'Chatroom Displayed Successfully',
           ChatRoom
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Getting Chatroom',
            error
        })
    }

}

module.exports = {createChatRoom,getChatRoom}