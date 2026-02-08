import { createTransaction,getTransactions } from "../controller/TransactionController.js";
import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";

const transactionRoutes=express.Router();

transactionRoutes.post('/',authMiddleware,createTransaction);
transactionRoutes.get('/:accountId',authMiddleware,getTransactions);

export default transactionRoutes;