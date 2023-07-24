import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

import NavBar from "../../../components/NavBar";
import { Input, Button } from "../../../components/ui";
import { login } from "../../../http/user";
import { userLoggedIn } from "../../../redux/actions/userActions";

const Loginform = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    console.log(user);

    const inputDataStructure = {
        email: {
            key: "title",
            label: "Email",
            data: "",
            type: "text",
            isValid: true,
            error: "",
        },

        password: {
            key: "password",
            label: "Password",
            data: "",
            type: "password",
            isValid: true,
            error: "",
        },
    };

    const [inputs, setInputs] = useState(inputDataStructure);

    const handleChange = (data, input) => {
        input.data = data;

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
    };

    const handleSubmit = async () => {
        const event = window.event;
        event.preventDefault();

        let data = {
            email: inputs.email.data,
            password: inputs.password.data,
        };

        try {
            const result = await login(data);

            toast.success("Logged in successfully!");

            var decodedToken = jwt_decode(result.token);

            const userData = {
                token: result.token,
                id: decodedToken.id,
                name: decodedToken.name,
                email: decodedToken.email,
                role: "user",
            };

            setTimeout(() => {
                dispatch(userLoggedIn(userData));
            }, 1000);
        } catch (e) {
            toast.error(e);
        }
    };

    if (user.authenticated) {
        if (user.data.role == "admin") {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/profile" />;
        }
    }

    return (
        <div
            id="body"
            className=" h-screen w-full flex justify-center items-center"
        >
            <NavBar />

            <form className="drop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-80  w-[80vw] lg:w-[40vw] pb-20 mx-auto mt-[30%] lg:mt-[10%]  shadow-lg rounded-xl  bg-clip-padding  flex flex-col items-center">
                <h2 className="w-full  text-center bg-primary text-white font-bold text-2xl md:text-2xl  mb-2 rounded-t-lg py-1">
                    Login to the account
                </h2>
                <img
                    src={require("../../../assets/img/logo.webp")}
                    className="w-48"
                />

                <div className="w-4/5">
                    <Input input={inputs.email} handleChange={handleChange} />
                    <Input
                        input={inputs.password}
                        handleChange={handleChange}
                    />
                </div>

                <div className="w-4/5">
                    <Button text="Login" handleClick={handleSubmit} />
                </div>

                <div className="flex mr-10">
                    <p className="pr-2">Don't have an account?</p>
                    <Link
                        className="hover:text-primary underline text-sm"
                        to="/register"
                    >
                        Sign-up
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Loginform;
