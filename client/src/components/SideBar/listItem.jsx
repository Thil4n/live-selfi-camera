import React from "react";
import { NavLink } from "react-router-dom";

const ListItem = ({ item }) => {
    const getClassList = () => {
        let classList =
            "flex gap-4 flex-row items-center h-10 px-3 rounded-lg  hover:bg-gray-100 hover:text-gray-700 w-full ";
        classList += item.selected ? "bg-gray-400 text-gray-700" : "text-white";
        return classList;
    };

    const handleLogout = (e) => {
        if (item.url == "/logout") {
            if (!window.confirm("Do you want to log out?")) {
                e.preventDefault();
            }
        }
    };

    return (
        <li>
            <NavLink onClick={(e) => handleLogout(e)} to={item.url}>
                <span className={getClassList()}>
                    {item.icon}
                    <h2 className="capitalize">{item.title}</h2>
                </span>
            </NavLink>
        </li>
    );
};

export default ListItem;
