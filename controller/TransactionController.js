import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';
import mongoose from 'mongoose';

export const createTransaction=async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {type,amount,category,date,fromAccountId,toAccountId}=req.body;
    let amt=Number(amount);
    try{
        if(type==="expense"){
            const fromAccount=await Account.findOne({_id:fromAccountId});
            if(!fromAccount){
                return res.status(404).json({message:"Account not found"});
            }
            if(fromAccount.balance<amount || amount<=0){
                return res.status(400).json({message:"Insufficient balance"});
            }
            fromAccount.balance-=amount;
            await fromAccount.save();

            const transaction=new Transaction({
                account:fromAccountId,
                type,
                amount,
                category,
                date
            });
            await transaction.save();
            res.status(201).json(transaction);
        }else if(type==="income"){
            const account=await Account.findOne({_id:toAccountId});
            if(!account){
                return res.status(404).json({message:"Account not found"});
            }
            if(amount<=0){
                return res.status(400).json({message:"Amount must be greater than zero"});
            }
            account.balance+=amt;
            await account.save();

            const transaction=new Transaction({
                account:toAccountId,
                type,
                amount,
                category,
                date
            });
            await transaction.save();
            res.status(201).json(transaction);
        }else if(type==="transfer" && fromAccountId && toAccountId){
            const fromAccount = await Account.findOne({ _id: fromAccountId });
            const toAccount = await Account.findOne({ _id: toAccountId });

            if(!fromAccount || !toAccount){
                return res.status(404).json({message:"Account not found"});
            }
            if(fromAccount.balance<amount){
                return res.status(400).json({message:"Insufficient balance"});
            }
            fromAccount.balance-=amount;
            toAccount.balance+=amt;
            await fromAccount.save();
            await toAccount.save();
            const transaction=new Transaction({
                account:fromAccountId,
                type,
                amount,
                receiver:toAccountId,
                category,
                date
            });
            await transaction.save();
            res.status(201).json(transaction);
        }else{
            return res.status(400).json({message:"Invalid transaction type"});
        }
        session.commitTransaction();
        session.endSession();
    }catch(error){
        console.log(error);;
        
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({message:"Server error"}); 
    }
}

export const getTransactions=async(req,res)=>{
    const accountId=req.params.accountId;
    try{
        const transactions=await Transaction.find({account:accountId}).sort({date:-1});
        if(!transactions || transactions.length===0){
            return res.status(404).json({message:"No transactions found"});
        }
        res.status(200).json(transactions);
     }catch(error){
        res.status(500).json({message:"Server error"});
     }
}