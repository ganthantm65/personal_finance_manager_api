import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    category:{type: String, required:true},
    amount:{ type: Number, required: true},
    month:{ type: String,required:true},
    year:{ type: Number, required: true},
},{timestamps:true})

export default mongoose.model("Budget",budgetSchema);