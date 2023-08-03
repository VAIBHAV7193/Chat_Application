const mongoose = require('mongoose');


const ChatRoom_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:'Name is required'
    },
    
});

module.exports = mongoose.model('Chatroom',ChatRoom_Schema)