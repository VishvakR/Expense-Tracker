import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";

function Login() {
  return (
    <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center items-center">
            <h3 className="text-xl semibold text-black">Welcome Back</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                Please enter your details.
            </p>
        </div>
    </AuthLayout>
  );
}

export default Login;