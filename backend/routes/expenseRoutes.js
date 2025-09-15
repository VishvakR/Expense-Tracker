const express = require("express");
const { addExpense, getAllExpense, deleteExpense, downloadExpense } = require("../controllers/expenseController");

const { protect } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
// router.get('/downloadexcel', protect, downloadExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;