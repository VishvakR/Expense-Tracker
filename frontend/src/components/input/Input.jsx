import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Input({value, onChange, placeHolder, label, type }){

    const [showPassword, setshowPassword] = useState(false);
    const toggleShowPassword = () => setshowPassword(prev => !prev);


    return (
        <div>
            <label className="text-[13px] text-slate-800">{label}</label>
            <div className="input-box">
                <input 
                    type={type === "password" ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeHolder}
                    onChange={(e) => onChange(e)}
                    value={value}
                    className="w-full bg-transparent outline-none"
                />
                {type === "password" && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={22}
                                className="text-primary cursor-pointer"
                                onClick={() => toggleShowPassword()}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className="text-slate-400 cursor-pointer"
                                onClick={() => toggleShowPassword()}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Input