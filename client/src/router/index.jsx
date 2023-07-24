import React from "react";
import { BrowserRouter } from "react-router-dom";

import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

const Router = () => {
    return (
        <BrowserRouter>
            <AdminRoutes />
            <UserRoutes />
        </BrowserRouter>
    );
};

export default Router;
