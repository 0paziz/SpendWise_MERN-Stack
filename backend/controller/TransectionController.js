const Transection = require("../models/TransectionModel");

async function createTransaction(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { type, amount, category, description, date } = req.body;
    if (!type || !amount || !category) {
      return res.status(400).json({ message: "type, amount and category are required" });
    }

    const doc = await Transection.create({
      user: userId,
      type,
      amount,
      category,
      description: description || "",
      date: date || Date.now(),
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error("createTransaction error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getTransactions(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const list = await Transection.find({ user: userId }).sort({ date: -1 });
    res.json(list);
  } catch (err) {
    console.error("getTransactions error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getTransactionById(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const item = await Transection.findById(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    if (item.user.toString() !== userId) return res.status(403).json({ message: "Forbidden" });

    res.json(item);
  } catch (err) {
    console.error("getTransactionById error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateTransaction(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const item = await Transection.findById(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    if (item.user.toString() !== userId) return res.status(403).json({ message: "Forbidden" });

    const updatable = ["type", "amount", "category", "description", "date"];
    updatable.forEach((k) => {
      if (req.body[k] !== undefined) item[k] = req.body[k];
    });

    await item.save();
    res.json(item);
  } catch (err) {
    console.error("updateTransaction error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteTransaction(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const item = await Transection.findById(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    if (item.user.toString() !== userId) return res.status(403).json({ message: "Forbidden" });

    await item.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("deleteTransaction error:", err);
    res.status(500).json({ message: "Server error" });
  }
}


/*
 Dashboard summary endpoint:
 - total income
 - total expense
 - balance
 - expenses grouped by category
 - monthly totals (income & expense per YYYY-MM)
*/
const mongoose = require("mongoose");

async function getDashboardSummary(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Totals by type (income/expense)
    const totals = await Transection.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]);

    const totalsMap = totals.reduce((acc, r) => {
      acc[r._id] = r.total;
      return acc;
    }, { income: 0, expense: 0 });

    const income = totalsMap.income || 0;
    const expense = totalsMap.expense || 0;

    // Expenses grouped by category
    const expensesByCategory = await Transection.aggregate([
      { $match: { user: userObjectId, type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $project: { _id: 0, category: "$_id", total: 1 } },
      { $sort: { total: -1 } },
    ]);

    // Monthly totals (YYYY-MM) with income and expense per month
    const byMonthAgg = await Transection.aggregate([
      { $match: { user: userObjectId } },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%Y-%m", date: "$date" } },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          entries: { $push: { type: "$_id.type", total: "$total" } },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          income: {
            $sum: {
              $map: {
                input: "$entries",
                as: "e",
                in: { $cond: [{ $eq: ["$$e.type", "income"] }, "$$e.total", 0] },
              },
            },
          },
          expense: {
            $sum: {
              $map: {
                input: "$entries",
                as: "e",
                in: { $cond: [{ $eq: ["$$e.type", "expense"] }, "$$e.total", 0] },
              },
            },
          },
        },
      },
      { $sort: { month: 1 } },
    ]);

    res.json({
      income,
      expense,
      balance: income - expense,
      expensesByCategory,
      byMonth: byMonthAgg,
    });
  } catch (err) {
    console.error("getDashboardSummary error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getDashboardSummary,
};