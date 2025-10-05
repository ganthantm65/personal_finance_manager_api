import Account from '../models/Account.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const createAccount=async(req,res)=>{
    const {name,currency,amount,type,PIN,accNo,ifsc}=req.body;
    const userId=req.params.userId;

    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({message:`User with id ${userId} not found`});
    }
    if(!name || !currency || !type || !PIN || !accNo || !ifsc){
        return res.status(400).json({message:"Some field is missing"});
    }
    const account = new Account({
        user: userId,
        name,
        currency,
        type,
        PIN,
        accNo,
        ifsc,
        balance: amount || 0
    });
    await account.save();
    res.status(201).json({account,message:"Account created successfully"});
}
export const getAccounts=async(req,res)=>{
    const userId=req.params.userId;
    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({message:`User with id ${userId} not found`});
    }
    const accounts=await Account.find({user:userId});
    res.status(200).json({accounts});
}
export const updateAccount=async(req,res)=>{
    const accountId=req.params.accountId;
    const {name,currency,amount}=req.body;

    const account=await Account.findById(accountId);
    if(!account){
        return res.status(404).json({message:`Account with id ${accountId} not found`});
    }
    if(name){
        account.name=name;
        account.currency=currency;
        account.balance=amount;
        await account.save();
        return res.status(200).json({account,message:"Account updated successfully"});
    }
    res.status(400).json({message:"No field to update"});
}
export const verifyAccount=async(req,res)=>{
    const {accNo,PIN,password}=req.body;
    const userId=req.params.userId;
    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({message:`User with id ${userId} not found`});
    }
    const account=await Account.findOne({accNo:accNo,user:userId,PIN:PIN});
    if(!account){
        return res.status(404).json({message:"Account not found"});
    }
    if(bcrypt.compare(password,user.password)){
        return res.status(200).json({message:"Account verified successfully",validation:true});
    }
    res.status(400).json({message:"Invalid credentials",validation:false});
}