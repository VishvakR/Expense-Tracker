import React from "react";
import Graph_logo from "../../assets/images/graph1.jpg"
import { LuTrendingUpDown } from "react-icons/lu"
import loginLogo from "../../assets/images/loginLogo.svg"

function AuthLayout( {children} ) {
  return (
    <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
            <h1 className="text-lg font-medium text-black">Expense Tracker</h1>
            {children}
        </div>

        <div className="hidden md:block w-[40vw] bg-green-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">

          <div className="w-48 h-48 rounded-[40px] bg-green-500 absolute -top-7 -left-5" />
          <div className="w-82 h-56 rounded-[40px] border-[20px] border-green-500 absolute top-[20%] -right-10 bg-cover bg-no-repeat bg-center overflow-hidden" style={{ backgroundImage: `url(${loginLogo})` }} />
          <div className="w-48 h-48 rounded-[40px] bg-green-500 absolute -bottom-7 -left-5" />

          <div className="grid grid-cols-1 z-20">
            <StatsInfoCard
              icon={<LuTrendingUpDown />}
              label="Track Your Income Expenses"
              value="530,000"
              color="bg-primary"
            />
          </div> 

          <img 
            src={Graph_logo}
            alt="Logo" 
            className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15" 
          />
        </div>
    </div>
  ); 
}

export default AuthLayout;

const StatsInfoCard = ({icon, label, value, color}) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-green-400/10 border border-gray-200/50 z-10">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">{value}</span>
      </div>
    </div>
  )
}