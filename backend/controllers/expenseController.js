const Expense = require('../models/Expense');
// const XLSX = require('xlsx');

// Add income
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;
        if (!category || !amount || !date){
            return res.status(400).json({message : "Please fill all the fileds"});
            
        }

        const expense = await Expense.create({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        res.status(201).json(expense);


    } catch (error) {
        res.status(500).json({message : "Server Error", error: error.message});
    }

}

// Get all expense
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).sort({date : -1});
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
}

// Delete Expense
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "Expense deleted successfully"});

    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
}

// Download Expense data as Excel file
// exports.downloadExpense = async (req, res) => {
//     const userId = req.user.id;
//     try {
//         const expense = await Expense.find({userId}).sort({date : -1});
        
//         const data = expense.map(item => ({
//             catagory: item.catagory,
//             Amount: item.amount,
//             Date: item.date
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(data);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Expense");
//         XLSX.writeFile(workbook, "ExpenseData.xlsx");

//         res.download("ExpenseData.xlsx");   
//     } catch (error) {
//         res.status(500).json({message : "Server Error"});
//     }   
// }