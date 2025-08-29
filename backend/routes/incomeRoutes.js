const express = require("express");
const { addIncome, getAllIncome, deleteIncome, downloadIncome } = require("../controllers/incomeController");

const { protect } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIncome);
// router.get('/downloadexcel', protect, downloadIncome);
router.delete('/:id', protect, deleteIncome);

module.exports = router;