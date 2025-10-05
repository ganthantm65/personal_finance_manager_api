import { createTransaction,getTransactions } from "../controller/TransactionController.js";
import express from "express";

const transactionRoutes=express.Router();

transactionRoutes.post('/',createTransaction);
transactionRoutes.get('/:accountId',getTransactions);

export default transactionRoutes;