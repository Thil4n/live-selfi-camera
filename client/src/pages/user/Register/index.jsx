import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import NavBar from "../../../components/NavBar";
import { Input, Button } from "../../../components/ui";
import { register } from "../../../http/user";

const RegisterForm = () => {
    const loggedIn = useSelector((state) => state.user.authenticated);

    const inputDataStructure = {
        name: {
            key: "name",
            label: "Name",
            data: "",
            type: "text",
            isValid: true,
            error: "",
        },
        email: {
            key: "email",
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
    const [registerState, setRegisterState] = useState(false);

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
        };

        try {
            data.name = inputs.name.data;
            data.email = inputs.email.data;
            data.password = inputs.password.data;

            const result = await register(data);

            toast.success("Registration is successfull!");

            setTimeout(() => {
                setRegisterState(true);
            }, 5000);
        } catch (e) {
            toast.error(e);
        }
    };

    if (loggedIn) return <Navigate to="/dashboard" />;
    if (registerState) return <Navigate to="/login" />;

    return (
        <div className="bg-img h-screen">
            <NavBar />
            <form className="drop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-80  w-[80vw] lg:w-[40vw] pb-20 mx-auto mt-[30%] lg:mt-[10%]  shadow-lg rounded-xl  bg-clip-padding  flex flex-col items-center">
                <h2 className="w-full  text-center bg-primary text-white font-bold text-2xl md:text-2xl  mb-2 rounded-t-lg py-1">
                    Create an account
                </h2>
                <img
                    src={require("../../../assets/img/logo.webp")}
                    className="w-48"
                />

                <div className="w-4/5">
                    <div>
                        <Input
                            input={inputs.name}
                            handleChange={handleChange}
                        />
                        <Input
                            input={inputs.email}
                            handleChange={handleChange}
                        />
                        <Input
                            input={inputs.password}
                            handleChange={handleChange}
                        />
                    </div>
                </div>

                <div className="w-4/5 mt-4">
                    <Button text={"Register"} handleClick={handleSubmit} />
                </div>

                <p className="pr-2">
                    Already have an account?
                    <Link
                        className="ml-2 hover:text-primary underline text-sm"
                        to="/login"
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
