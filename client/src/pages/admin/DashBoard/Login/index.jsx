import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";

import { Input, Button } from "../../../../components/ui";
import { login } from "../../http/user";
import { userLoggedIn } from "../../redux/actions/userActions";

const Loginform = () => {
    const loggedIn = useSelector((state) => state.user.authenticated);
    const dispatch = useDispatch();

    const inputDataStructure = {
        phoneNumber: {
            key: "title",
            label: "Phone number",
            data: "",
            type: "number",
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
            phoneNumber: inputs.phoneNumber.data,
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
                phoneNumber: decodedToken.phoneNumber,
                avatar: decodedToken.avatar,
                role: decodedToken.role,
            };

            setTimeout(() => {
                dispatch(userLoggedIn(userData));
            }, 1000);
        } catch (e) {
            toast.error(e);
        }
    };

    if (loggedIn) return <Navigate to="/dashboard" />;

    return (
        <div className="bg-img h-screen w-full flex justify-center items-center">
            <ToastContainer />
            <form className="bg-gradient-to-tr from-[#baf8f8] to-[#b2bec3]  w-[80vw] lg:w-[50vw] pb-20 mx-auto mt-[30%] lg:mt-[10%]  shadow-lg rounded-xl bg-white bg-clip-padding bg-opacity-70 flex flex-col items-center">
                <h2 className="w-full  text-center bg-[#55efc4] text-white font-bold text-2xl md:text-2xl  mb-2 rounded-t-lg py-1">
                    Login to the account
                </h2>
                <img
                    src={require("../../assets/img/logo.png")}
                    className="w-48"
                />

                <div className="w-4/5">
                    <Input
                        input={inputs.phoneNumber}
                        handleChange={handleChange}
                    />
                    <Input
                        input={inputs.password}
                        handleChange={handleChange}
                    />
                </div>

                <div className="w-4/5">
                    <Button text="Login" handleClick={handleSubmit} />
                </div>
            </form>
        </div>
    );
};

export default Loginform;
