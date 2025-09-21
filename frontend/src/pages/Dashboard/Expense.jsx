import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import { LuMoveDiagonal } from "react-icons/lu";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

function Expense() {
  useUserAuth()
  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show : false,
    data : null
  })
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false)

  const fetchExpenseDetail = async () => {
    if(loading) return;
    setLoading(true)
    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_EXPENSE}`
      )
      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log("something went wrong Please try later", error)
    }
    finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense
    if (!category.trim()) {
      toast.error("Category is Required")
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      })
      setOpenAddExpenseModel(false)
      toast.success("Expense added Successfully")
      fetchExpenseDetail()
    } catch (error) {
      console.error(
        "error adding Expense",
        error.response?.data?.message || error.message
      )
    }
  }

  const deleteExpenseDetail = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({show : false, data : null})
      toast.success("Expense detail delete successfully")
      fetchExpenseDetail()

    } catch (error) {
      console.error(
        "Error deleting Expense",
        error.response?.data?.message || error.message
      )
    }
  }
  useEffect(() => {
    fetchExpenseDetail()
    return () => {}
  }, [])
  return (
    <DashboardLayout activeMenu="expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({show : true, data : id})
            }}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show : false, data: null})}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense details?"
            onDelete={() => deleteExpenseDetail(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Expense;