import React from "react";
import NavBar from "../../../components/NavBar";
import SideBar from "../../../components/SideBar";

import HomeSection from "./Home";
import EventSection from "./Events";
import UserSection from "./Users";

const Dashboard = ({ section }) => {
    console.log(section);
    return (
        <div>
            <NavBar />
            <div className="flex mt-[85px] gap-6">
                <div className="w-[220px] p-10 bg-primary fixed h-screen -mt-12">
                    <SideBar section={section} />
                </div>
                <div className="w-full ml-[220px] ">
                    {section == "home" && <HomeSection />}
                    {section == "events" && <EventSection />}
                    {section == "users" && <UserSection />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
