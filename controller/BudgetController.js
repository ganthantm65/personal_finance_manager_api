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
      amount,
      month,
      year,
    });

    await budget.save();
    res.status(201).json(budget);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getBudgets = async (req, res) => {
  const budgets = await Budget.find({ user: req.user.id });
  res.status(200).json({ budgets });
};

export const updateBudget = async (req, res) => {
  const budget = await Budget.findById(req.params.id);
  if (!budget) return res.status(404).json({ message: "Not found" });

  if (budget.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  Object.assign(budget, req.body);
  await budget.save();
  res.status(200).json(budget);
};
