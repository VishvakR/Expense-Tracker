import React from "react";
import CostomPieChart from "../Charts/CostomPieChart";
const COLOR = ["#715A5A", "#EA2264", "#EB5B00"]
 function FinanceOverview({ totalBalance, totalExpense, totalIncome }) {
    const balanceData = [
        { name : "Total Balance", amount : totalBalance},
        { name : "Total Expense", amount : totalExpense},
        { name : "Total Income", amount : totalIncome}
    ]
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Finance Overview</h5>
            </div>
            <CostomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${totalBalance}`}
                colors={COLOR}
                showTextAnchor
            />
        </div>
    )
 }

 export default FinanceOverview;