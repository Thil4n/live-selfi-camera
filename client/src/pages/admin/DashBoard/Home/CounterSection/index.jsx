import React from "react";
import {
    FaUsers,
    FaUser,
    FaCheckDouble,
    FaListUl,
    FaExclamationTriangle,
    FaSpinner,
} from "react-icons/fa";

import SingleCounter from "./SingleCounter";

const CounterSection = ({ countData }) => {
    const counts = [
        {
            title: "Users",
            count: countData.userCount,
            icon: <FaUsers />,
        },
        { title: "Events", count: countData.adminCount, icon: <FaUser /> },
        { title: "Streams", count: countData.adminCount, icon: <FaUser /> },
    ];

    return (
        <div className="flex flex-wrap">
            {counts.map((item) => {
                return <SingleCounter item={item} />;
            })}
        </div>
    );
};

export default CounterSection;
