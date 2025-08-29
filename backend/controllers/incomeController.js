const Income = require('../models/Income');
// const XLSX = require('xlsx');

// Add income
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;
        if (!source || !amount || !date){
            return res.status(400).json({message : "Please fill all the fileds"});
            
        }

        const income  = await Income.create({
            userId,
            icon,
            source,
            amount,
            date : new Date(date)
        })

        await income.save();
        res.status(201).json(income);


    } catch (error) {
        res.status(500).json({message : "Server Error", error: error.message});
    }

}

// Get all income
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({userId}).sort({date : -1});
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
}

// Delete income
exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "Income deleted successfully"});
    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
}

// Download income data as Excel file
// exports.downloadIncome = async (req, res) => {
//     const userId = req.user.id;
//     try {
//         const income = await Income.find({userId}).sort({date : -1});
        
//         const data = income.map(item => ({
//             Source: item.source,
//             Amount: item.amount,
//             Date: item.date
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(data);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Income");
//         XLSX.writeFile(workbook, "IncomeData.xlsx");

//         res.download("IncomeData.xlsx");   
//     } catch (error) {
//         res.status(500).json({message : "Server Error"});
//     }   
// }