import { createBudget,getBudgets,updateBudget } from "../controller/BudgetController.js";

import express from "express";

const budgetRoutes=express.Router();

budgetRoutes.post('/budgets/:userId',createBudget);
budgetRoutes.get('/budgets/:userId',getBudgets);
budgetRoutes.put('/budgets/:budgetId',updateBudget);

export default budgetRoutes;