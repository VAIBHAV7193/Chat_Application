const express = require('express')
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors')
const errorHandlers = require('./errorHandler')
const database = require('./database')


database();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

const port = process.env.PORT || 5000;


//required all model


const Chatroom_Model = require('./Model/ChatRoom');

//










//

app.use('/api/user',require('./Routes/userRoute'))
app.use('/api/chat',require('./Routes/chatRoom'))


const User = require('./Model/User');


const server = app.listen(port,()=>{
    console.log('server is running on port : ',port)
});


const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });
const jwt = require('jsonwebtoken');
const User_Data = require('./Model/User');
const Message_Data = require('./Model/Message')
io.use(async(socket,next)=>{
    

    try{
        let token  = socket.handshake.query.token;
        token = token.split(" ")[1];

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        socket.userId = decode._id;
        next();

    }
    catch(err){
        console.log(err);
    }

});

io.on('connection',(socket)=>{
    console.log("connected: ", socket.userId)

    socket.on('disconnect',()=>{
        console.log("Disconnected: ", socket.userId)
    });

    socket.on("joinRoom",({chatroomId})=>{
        socket.join(chatroomId)
        console.log("A user  Joined chat room :",chatroomId)

    })

    socket.on("leaveRoom",({chatroomId})=>{
        socket.leave(chatroomId)
        console.log("A user left chat room :",chatroomId)

    })

    socket.on("chatroomMessage",async({chatroomId,message})=>{
        if(message.trim().length > 0){
            const user = await User_Data.findOne({_id:socket.userId})
           
            const newMessage = await Message_Data.create({chatroom:chatroomId,user:socket.userId, messge:message})
            io.to(chatroomId).emit("newMessage",{
                message,
                name:user.name,
                userId:socket.userId
            })

            newMessage.save()
             
        }
        
    })
})
