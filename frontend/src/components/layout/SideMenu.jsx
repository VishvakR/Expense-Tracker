import { useContext, useState } from "react";
import React from "react";
import { menuItems } from "../../utils/data";
import { UserContext} from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

function SideMenu({ activeMenu }){
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (link) => {
        if(link === "logout"){
            handleLogout();
            return;
        }
        navigate(link);
    }

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    }

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-20 h-20 bg-slate-400 rounded-full"
                        />
                ) : (
                    <CharAvatar
                        fullName = {user?.username}
                        weight = "w-20"
                        height="h-20"
                        style="text-xl"
                    />
                )}
                <h5 className="text-gray-950 font-medium leading-6">
                    {user?.username || "Name"}
                </h5>
            </div>
            {menuItems.map((item, index) => (
                <button
                  key={`Menu${index}`}
                  className={`w-full flex items-center gap-4 text-[15px] ${
                    activeMenu == item.label ? "text-white bg-primary" : ""
                    } py-3 px-6 rounded-lg mb-3`}
                    onClick={ () => handleClick(item.link)}>
                    <item.icon className="text-xl" />
                    {item.label}

                </button>
            ))}
        </div>
    );
}

export default SideMenu;