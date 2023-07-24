import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Logout, Login, Register, Events, Home, Stream } from "../pages/user";

const UserRoutes = () => {
    const user = useSelector((state) => state.user);

    const PrivateRouter = () => {
        if (!user.authenticated) {
            return <Navigate to="/login" />;
        }

        switch (user.data.role) {
            case "user":
                return <Outlet />;
                break;
            case "admin":
                return <Navigate to="/admin" />;
                break;

            default:
                return <Navigate to="/profile/logout" />;
                break;
        }
    };

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/logout" element={<Logout />} />

            <Route path="/stream" element={<Stream />} />

            <Route element={<PrivateRouter user_type={"admin"} />}>
                <Route path="/profile" element={<Events />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
