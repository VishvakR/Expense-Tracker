import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
} from "react-icons/lu";

export const menuItems = [
    {
        id : "01",
        label : "dashboard",
        icon : LuLayoutDashboard,
        link : "/dashboard",
    },
    {
        id : "02",
        label : "income",
        icon : LuWalletMinimal,
        link : "/income",
    },
    {
        id : "03",
        label : "expense",
        icon : LuHandCoins,
        link : "/expense",
    },
    {
        id : "06",
        label : "logout",
        icon : LuLogOut,
        link : "/logout",
    }

]
