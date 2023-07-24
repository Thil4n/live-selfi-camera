import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const ChartSection = () => {
    const data = [
        { name: "January", events: 0, users: 4 },
        { name: "February", events: 15, users: 2 },
        { name: "March", events: 10, users: 19 },
        { name: "April", events: 13, users: 7 },
        { name: "May", events: 9, users: 9 },
        { name: "June", events: 11, users: 7 },
        { name: "July", events: 17, users: 8 },
        { name: "Augest", events: 17, users: 8 },
        { name: "September", events: 20, users: 4 },
        { name: "October", events: 15, users: 4 },
        { name: "November", events: 10, users: 8 },
        { name: "December", events: 17, users: 10 },
    ];
    return (
        <ResponsiveContainer width="99%" height={400}>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#fa2c6c"
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="events" stroke="#fa2c6c" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ChartSection;
