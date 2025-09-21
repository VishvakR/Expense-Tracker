import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/addIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

function Income() {
  useUserAuth()
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show : false,
    data : null
  })
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false)

  const fetchIncomeDetail = async () => {
    if(loading) return;
    setLoading(true)
    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_INCOME}`
      )
      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log("something went wrong Please try later", error)
    }
    finally {
      setLoading(false)
    }
  }

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income
    if (!source.trim()) {
      toast.error("Source is Required")
      return
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be valid number greater than zero")
      return
    }

    if(!date) {
      toast.error("Date is Required")
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      })
      setOpenAddIncomeModel(false)
      toast.success("Income added Successfully")
      fetchIncomeDetail()
    } catch (error) {
      console.error(
        "error adding Income",
        error.response?.data?.message || error.message
      )
    }

  }

  const deleteIncomeDetail = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({show : false, data : null})
      toast.success("Income detail delete successfully")
      fetchIncomeDetail()

    } catch (error) {
      console.error(
        "error deleting Income",
        error.response?.data?.message || error.message
      )
    }
  }

  useEffect(() => {
    fetchIncomeDetail()
  }, [])
  return (
    <DashboardLayout activeMenu="income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
          <IncomeList
              transactions={incomeData}
              onDelete={(id) => {
                setOpenDeleteAlert({show : true, data : id})
              }}
            />
        </div>
        <Modal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show : false, data: null})}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income details?"
            onDelete={() => deleteIncomeDetail(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;