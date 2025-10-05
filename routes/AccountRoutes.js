import { createAccount,getAccounts,updateAccount, verifyAccount } from "../controller/AccountController.js";

import express from "express";
const accountRoutes=express.Router();

accountRoutes.post('/:userId/accounts',createAccount);
accountRoutes.get('/:userId/accounts',getAccounts);
accountRoutes.put('/accounts/:accountId',updateAccount);
accountRoutes.post('/accounts/:userId',verifyAccount);

export default accountRoutes;