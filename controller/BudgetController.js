import Budget from "../models/Budget.js";

export const createBudget = async (req,res)=>{
    try{
        const {category,amount,month,year} = req.body;
        if(!category || !amount || !month || !year){
            return res.status(400).json({message:"Some field is missing"});
        }
        const budget = new Budget({
            user:req.params.userId,
            category,
            amount,
            month,
            year,
        })
        await budget.save();
        res.status(201).json({message:"Budget created successfully",budget});
    }catch(err){
        res.status(500).json({message:"Server Error"});
    }
}

export const getBudgets = async (req,res)=>{
    const budgets=await Budget.find({user:req.params.userId});
    if(!budgets){
        return res.status(404).json({message:"No budgets found"});
    }
    res.status(200).json({budgets});
}

export const updateBudget = async (req,res)=>{
    try{
        const {category,amount,month,year} =req.body;
        const budgetId=req.params.budgetId;
        const budget=await Budget.findById(budgetId);
        if(!budget){
            return res.status(404).json({message:"Budget not found"});
        }
        budget.category=category||budget.category;
        budget.amount=amount||budget.amount;
        budget.month=month||budget.month;
        budget.year=year||budget.year;
        await budget.save();
        res.status(200).json({message:"Budget updated successfully",budget});
    }catch(err){
        res.status(500).json({message:err});
    }
}