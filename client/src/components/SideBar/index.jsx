import React from "react";
import { useSelector } from "react-redux";

import ListItem from "./listItem";

import {
    FaUser,
    FaUsers,
    FaHome,
    FaMoneyCheck,
    FaWhmcs,
    FaPowerOff,
} from "react-icons/fa";

const SideBar = ({ section }) => {
    const user = useSelector((state) => state.user);

    const adminNavList = [
        {
            id: 1,
            title: "Home",
            url: "/admin",
            icon: <FaHome />,
            selected: section == "home",
        },
        {
            id: 5,
            title: "Users",
            url: "/admin/users",
            icon: <FaMoneyCheck />,
            selected: section == "users",
        },

        {
            id: 3,
            title: "Events",
            url: "/admin/events",
            icon: <FaUser />,
            selected: section == "events",
        },

        {
            id: 7,
            title: "Logout",
            url: "/admin/logout",
            icon: <FaPowerOff />,
        },
    ];

    const userNavList = [
        {
            id: 1,
            title: "Dashboard",
            url: "/profile",
            icon: <FaHome />,
        },

        {
            id: 3,
            title: "My events",
            url: "/profile/events",
            icon: <FaUser />,
        },

        {
            id: 7,
            title: "Logout",
            url: "/logout",
            icon: <FaPowerOff />,
        },
    ];

    let navList = [];

    if (user.data.role == "admin") {
        navList = adminNavList;
    } else {
        navList = userNavList;
    }

    return (
        <ul className="space-y-4 mb-12 mt-8 w-full">
            {navList.map((item) => (
                <ListItem key={item.id} item={item} />
            ))}
        </ul>
    );
};
export default SideBar;
