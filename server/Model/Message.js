const mongoose = require('mongoose');


const Message_Schema = new mongoose.Schema({
    chatroom:{
        type:mongoose.SchemaTypes.ObjectId,
        required:'chat is required',
        ref:'Chatroom'
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:'user is required',
        ref:'User'
    },
    messge:{
        type:String,
        required:'message is required'
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Message',Message_Schema)