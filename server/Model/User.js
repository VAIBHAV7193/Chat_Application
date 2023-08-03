const mongoose = require('mongoose');


const User_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:'Name is required'
    },
    email:{
        type:String,
        required:'Email is required',
    },
    password:{
        type:String,
        required:'password is required'
    }
},{
    timestamps:true
});

module.exports = mongoose.model('User',User_Schema)