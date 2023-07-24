import React from "react";
import { Button } from "../../../components/ui";
import { AiOutlineInstagram } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";

const Navbar = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div
            id="body"
            className="min-h-screen bg-gradient-to-b from-[#761bd7] to-[#db5965]"
        >
            <div id="content" className="min-h-screen flex flex-col  relative">
                <div className="grid-container"></div>
                <header className="flex justify-between items-center text-white p-4">
                    <div className="flex items-center"></div>
                    <div className="flex gap-4">
                        <Link to="/login">
                            <Button
                                className={"bg-[#761bd7] text-white"}
                                text="Login"
                                handleClick={() => {}}
                            />
                        </Link>
                        <Link to="/login">
                            <Button
                                className={"bg-[#761bd7] text-white"}
                                text="Join Beta"
                                handleClick={() => {}}
                            />
                        </Link>
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center">
                    <img
                        src={require("../../../assets/img/logo.webp")}
                        alt="Content"
                        className="mx-auto w-96"
                    />
                    <h1 className="text-white font-extrabold text-3xl mt-4">
                        Live Event Selfie Cam
                    </h1>
                </main>

                <footer className="text-white p-4 text-center flex justify-between">
                    <div className="flex justify-center items-center">
                        &copy; {currentYear} FANY
                    </div>
                    <a
                        href="https://instagram.com/fany.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white"
                    >
                        <AiOutlineInstagram size={32} />
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default Navbar;
