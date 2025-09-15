const Income = require('../models/Income');
const Expense = require('../models/Expense');
const {isValidObjectId, Types} = require('mongoose');

// Get dashboard data
exports.getDashboardData = async (req, res) => {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));
    try {
        const totalIncomeAgg = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpenseAgg = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        
        const last60DaysIncomeTrans = await Income.find({
            userId : userObjectId,
            date: { $gte: new Date(Date.now() - 60*24*60*60*1000) }
        }).sort({date : -1});

        const last60DaysIncome = last60DaysIncomeTrans.reduce((acc, curr) => acc + curr.amount, 0);

        // Last 30 days expense transactions
        const last30DaysExpenseTrans = await Expense.find({
            userId : userObjectId,
            date: { $gte: new Date(Date.now() - 30*24*60*60*1000) }
        }).sort({date : -1});

        // Last 30 days expense total
        const last30DaysExpense = last30DaysExpenseTrans.reduce(
            (acc, curr) => acc + curr.amount, 0);

        const lastTrans = [
            ...(await Income.find({userId: userObjectId}).sort({date : -1}).limit(5)).map(
                tran => ({
                    ...tran.toObject(), 
                    type: 'income'
                })
            ),
            ...(await Expense.find({userId: userObjectId}).sort({date : -1}).limit(5)).map(
                tran => ({
                    ...tran.toObject(),
                    type: 'expense'
                })
            )
        ].sort((a, b) => b.date - a.date);

        res.status(200).json({
            totalBalance:
                (totalIncomeAgg[0]?.total || 0) - (totalExpenseAgg[0]?.total || 0),
            totalIncome: totalIncomeAgg[0]?.total || 0,
            totalExpense: totalExpenseAgg[0]?.total || 0,
            last30DaysExpense : {
                total : last30DaysExpense,
                transactions : last30DaysExpenseTrans
            },
            last60DaysIncome : {
                total : last60DaysIncome,
                transactions : last60DaysIncomeTrans
            },
            lastTransactions: lastTrans
        });
    } catch (error) {
        res.status(500).json({message : "Server Error", error: error.message});
    }
}


