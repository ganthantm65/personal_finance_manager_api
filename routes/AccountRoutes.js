import { createAccount,getAccounts,updateAccount, verifyAccount } from "../controller/AccountController.js";

import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
const accountRoutes=express.Router();

accountRoutes.post('/:userId/accounts',authMiddleware,createAccount);
accountRoutes.get('/:userId/accounts',authMiddleware,getAccounts);
accountRoutes.put('/accounts/:accountId',authMiddleware,updateAccount);
accountRoutes.post('/accounts/:userId',authMiddleware,verifyAccount);

export default accountRoutes;