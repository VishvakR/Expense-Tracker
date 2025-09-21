import React, { useState } from "react";
import Input from "../input/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

function AddIncomeForm({ onAddIncome }) {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: ""
    })
    const handleChange = (key, value) => setIncome({...income, [key]: value})

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input 
                type="text"
                value={income.source}
                label="income source"
                onChange={({target}) => handleChange("source", target.value)}
                placeholder="Freelancing, Salary, etc."
            />

            <Input 
                type="number"
                value={income.amount}
                label="amount"
                onChange={({target}) => handleChange("amount", target.value)}
                placeholder=""
            />

            <Input 
                type="date"
                value={income.date}
                label="date"
                onChange={({target}) => handleChange("date", target.value)}
                placeholder=""
            />

            <div className="flex justify-end mt-6">
                <button type="button" className="add-btn add-btn-fill" onClick={() => onAddIncome(income)}>
                    Add Income
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm