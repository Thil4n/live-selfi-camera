import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const NavBar = () => {
    const user = useSelector((state) => state.user);

    return (
        <div>
            <ToastContainer />
            <nav className="header-nav z-30 fixed top-0 left-0 w-full  h-16  bg-white shadow-lg">
                <div className="container m-auto flex justify-between items-center text-gray-700">
                    <a href="/">
                        <img
                            className="h-[60px] bg-white pb-1 pt-1"
                            src={require("../../assets/img/logo.webp")}
                        ></img>
                    </a>

                    <div className="inset-0 transition-all  flex items-center justify-center space-y-0 space-x-8  flex-row lg:space-x-14"></div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
