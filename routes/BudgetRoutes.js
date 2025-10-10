import { createBudget,getBudgets,updateBudget } from "../controller/BudgetController.js";

import express from "express";

const budgetRoutes=express.Router();

budgetRoutes.post('/:userId',createBudget);
budgetRoutes.get('/:userId',getBudgets);
budgetRoutes.put('/:budgetId',updateBudget);

export default budgetRoutes;