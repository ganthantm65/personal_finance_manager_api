import mongoose  from "mongoose";

const transactionSchema =new mongoose.Schema({
    account:{type: mongoose.Schema.Types.ObjectId, ref:"Account", required:true},
    type:{type: String, enum:["income","expense","transfer"], required:true},
    amount:{type: Number, required:true},
    category:{type: String, required:true},
    date:{type: Date, default: Date.now}
},{timestamps:true})

export default mongoose.model("Transaction",transactionSchema);