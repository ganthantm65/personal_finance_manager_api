import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const jwt_key = process.env.JWT_SECRET || "fallbackSecret";

export const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    
    const existing=await User.findOne({email});
    if(existing){
        return res.status(400).json({message:`User with email ${email} already exists`});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=new User({name,email,password:hashedPassword});
    await user.save();
    const token=jwt.sign({id:user._id,email:user.email},jwt_key,{expiresIn:'1h'});
    res.status(201).json({token,
        user:{id:user._id,name:user.name,email:user.email},
        message:'User registered successfully'});
}

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:`Invalid email or password`});
    }
    const isMatched=await bcrypt.compare(password,user.password);
    if(!isMatched){
        return res.status(400).json({message:`Invalid email or password`});
    }
    const token=jwt.sign({id:user._id,email:user.email},jwt_key,{expiresIn:'1h'});
    res.status(200).json({token,
        user:{id:user._id,name:user.name,email:user.email},
        message:'Login successful'});
}