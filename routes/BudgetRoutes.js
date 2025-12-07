import { createBudget, getBudgets, updateBudget } from "../controller/BudgetController.js";
import express from "express";

const budgetRoutes = express.Router();

budgetRoutes.post('/:userId', createBudget);
budgetRoutes.get('/user/:userId', getBudgets);
budgetRoutes.put('/update/:budgetId', updateBudget);

export default budgetRoutes;
