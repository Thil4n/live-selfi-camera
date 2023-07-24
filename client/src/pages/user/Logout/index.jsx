import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { userLoggedOut } from "../../../redux/actions/userActions";

const Logout = () => {
    const dispatch = useDispatch();

    dispatch(userLoggedOut());

    return <Navigate to="/login" />;
};

export default Logout;
