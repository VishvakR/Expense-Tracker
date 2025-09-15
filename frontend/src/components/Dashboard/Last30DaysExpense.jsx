import React, { useEffect, useState } from "react";
import { prepareExpenseBarChart } from "../../utils/helper";
import CostomBarChart from "../Charts/CostomBarChart";

function Last30DaysExpense({ data }) {
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        const result = prepareExpenseBarChart(data)
        setChartData(result)
        return () => {}
    }, [data])
    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expense</h5>
            </div>
            <CostomBarChart data={chartData} />
        </div>
    )
}

export default Last30DaysExpense