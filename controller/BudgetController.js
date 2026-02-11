import Budget from "../models/Budget.js";

export const createBudget = async (req, res) => {
  try {
    const { category, amount, month, year } = req.body;

    if (!category || !amount || !month || !year) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const budget = new Budget({
      user: req.user.id,
      category,
      amount: Number(amount),
      month,
      year,
    });

    await budget.save();
    res.status(201).json(budget);
  } catch {
    res.status(422).json({ message: "Unable to create budget" });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.status(200).json({ budgets });
  } catch {
    res.status(400).json({ message: "Invalid request" });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { category, amount, month, year } = req.body;

    const budget = await Budget.findById(req.params.budgetId);
    if (!budget) {
      return res.status(404).json({ message: "Not found" });
    }

    if (budget.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (category) budget.category = category;
    if (amount) budget.amount = Number(amount);
    if (month) budget.month = month;
    if (year) budget.year = year;

    await budget.save();
    res.status(200).json(budget);
  } catch {
    res.status(422).json({ message: "Unable to update budget" });
  }
};
