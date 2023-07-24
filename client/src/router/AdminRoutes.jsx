import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Logout, Login, Dashboard } from "../pages/admin";

const AdminRoutes = () => {
    const PrivateRouter = () => {
        const user = useSelector((state) => state.user);

        if (!user.authenticated) {
            return <Navigate to="/admin/login" />;
        }

        switch (user.data.role) {
            case "admin":
                return <Outlet />;
                break;
            case "user":
                return <Navigate to="/profile" />;
                break;

            default:
                return <Navigate to="/admin/logout" />;
                break;
        }
    };

    return (
        <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/logout" element={<Logout />} />

            <Route element={<PrivateRouter user_type={"admin"} />}>
                <Route path="/admin" element={<Dashboard section={"home"} />} />
                <Route
                    path="/admin/users"
                    element={<Dashboard section={"users"} />}
                />
                <Route
                    path="/admin/events"
                    element={<Dashboard section={"events"} />}
                />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
