const{hashPassword,comparePassword} = require('../helper/authHelper')
const User_Model = require('../Model/User')
const jwt = require('jsonwebtoken');


const registerController = async(req,res)=>{
    try{

        const{name,email,password} = req.body;
        if(!name){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'Email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
       
    
        //existing user
        const User = await User_Model.findOne({email});

        if(User){
            return res.status(201).send({
                success:false,
                messgae:'Alredy register user plz login'
            })
        };

        //register user
        const hashPassword2 =  await hashPassword(password);

        const registerUser = await User_Model.create({name,email,password:hashPassword2})

        registerUser.save()
        res.status(201).send({
            success:true,
            messgae:'User created successfully',
            user:{
                name:registerUser.name
            }
        })

    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            messgae:'Error in Registartion',
            err
        })
    }


}

const loginController = async(req,res)=>{
    try{
    const{email,password} = req.body;

    if(!email){
        return res.send({error:'Email is required'})

    }
    if(!password){
        return res.send({error:'Password is required'})
    }
    if(!email || !password){
        return res.send({error:'Both of the field is required'})

    }

    const User = await User_Model.findOne({email})

    if(!User){
        return res.status(404).send({
            success:false,
            messgae:'User name is invalid'

        })
    }

    const validPassword = await comparePassword(password,User.password);

    if(!validPassword){
        return res.status(200).send({
            success:false,
            messgae:'Invalid password'
        })
    }
    //@token 

    const token = jwt.sign({_id:User._id},process.env.SECRET_KEY,{expiresIn: "1d"});
    res.status(200).send({
        success:true,
        messgae:'Login successfully',
        user:{
            name:User.name,
            email:User.email,
        },
        token

    })
}

catch(err){
    return res.status(500).send({
        success:false,
        messgae:'Error in loging time',
        err
    })
}

};



module.exports = {registerController,loginController}