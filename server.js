import express from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';

import authRoutes from './routes/AuthRoutes.js';
import accountRoutes from './routes/AccountRoutes.js';
import transactionRoutes from './routes/TransactionRoutes.js';
import budgetRoutes from './routes/BudgetRoutes.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "https://my-wallet-snowy.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

console.log(process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/auth',authRoutes);
app.use('/api/user',accountRoutes)
app.use("/api/transactions",transactionRoutes);
app.use("/api/budgets",budgetRoutes);

const port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})