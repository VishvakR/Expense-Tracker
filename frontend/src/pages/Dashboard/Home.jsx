import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import InfoCard from "../../components/Cards/InfoCard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io"
import { addThousandSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpense from "../../components/Dashboard/Last30DaysExpense";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

function Home() {
  useUserAuth()
  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDashboardData = async () => {
    if(loading) return;
    setLoading(true)

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.DataTransfer.GET_DATA}`
      );
      if(response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong.please try again later",error)
    } finally {
      setLoading(false)
    }
  }

  useEffect( () =>{
    fetchDashboardData();
  }, [] )

  return (
    <DashboardLayout activeMenu="dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Bank Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-purple-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransactions
              transactions={dashboardData?.lastTransactions}
              onSeeMore={() => {navigate("/expense")}}
            />

            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalExpense={dashboardData?.totalExpense || 0}
              totalIncome={dashboardData?.totalIncome || 0}
            />
            
            <ExpenseTransactions
              transactions={dashboardData?.last30DaysExpense?.transactions}
              onSeeMore={() => {navigate("/expense")}}
            />

            <Last30DaysExpense
              data={dashboardData?.last30DaysExpense?.transactions}
            />

            <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
              totalIncome={dashboardData?.totalIncome || 0}
            />

            <RecentIncome
              transactions={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore={() => {navigate("/income")}}
            />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;