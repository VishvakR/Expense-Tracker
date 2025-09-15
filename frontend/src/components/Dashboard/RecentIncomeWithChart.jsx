import React, { useEffect, useState } from "react";
import CostomPieChart from "../Charts/CostomPieChart";

const COLOR = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F9"]

function RecentIncomeWithChart({ data, totalIncome }) {
    const [chartData, setChartData] = useState([])
    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }))
        setChartData(dataArr)
    }
    useEffect(() => {
        prepareChartData()
        return () => {}
    }, [data])
    return (
        <div className="card">
           <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 60 Days Income</h5>
           </div>
           <CostomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                colors={COLOR}
                showTextAnchor
            />
        </div>
    )
}

export default RecentIncomeWithChart