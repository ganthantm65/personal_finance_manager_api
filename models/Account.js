import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    name: {type: String, required:true,ref:"User"},
    type:{ type: String, enum:["savings","checking","credit"], required:true},
    accNo:{ type: String, required:true, unique:true},
    ifsc:{ type: String, required:true},
    PIN:{ type: String, required:true},
    balance:{ type: Number, default: 0},
    currency:{ type: String, required: true},
    createdAt:{ type: Date, default: Date.now},
},{timestamps:true})

export default mongoose.model("Account",accountSchema);