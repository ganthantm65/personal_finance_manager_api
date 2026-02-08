import { createBudget, getBudgets, updateBudget } from "../controller/BudgetController.js";
import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";

const budgetRoutes = express.Router();

budgetRoutes.post('/:userId',authMiddleware, createBudget);
budgetRoutes.get('/:userId',authMiddleware, getBudgets);
budgetRoutes.put('/update/:budgetId',authMiddleware, updateBudget);

export default budgetRoutes;
