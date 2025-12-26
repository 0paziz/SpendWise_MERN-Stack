const express = require("express");
const auth = require("../auth/AuthMiddleWare");
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getDashboardSummary,
} = require("../controller/TransectionController");

const router = express.Router();

router.use(auth); // protect all transaction routes

router.post("/create", createTransaction);
router.get("/", getTransactions);
router.get("/summary", getDashboardSummary);
router.get("/:id", getTransactionById);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;