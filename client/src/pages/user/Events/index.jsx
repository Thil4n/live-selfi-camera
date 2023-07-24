import React, { useState, useEffect } from "react";
import { Button, Input } from "../../../components/ui";
import { AiOutlineInstagram } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import { getEvents, createEvent } from "../../../http/event";
import { Table } from "antd";
import { toast } from "react-toastify";
import Joi from "joi";

const Events = () => {
    const currentYear = new Date().getFullYear();
    const [events, setEvents] = useState([]);

    const inputDataStructure = {
        title: {
            key: "title",
            label: "Title",
            data: "",
            type: "text",
            isValid: true,
            error: "",
            validation: Joi.string()
                .required()
                .empty()
                .min(3)
                .max(20)
                .messages({
                    "string.base": "Please enter a valid title",
                    "any.required": "Title is required",
                    "string.empty": "Title must not be empty",
                    "string.min": "Title must be at least 3 characters long",
                    "string.max": "Title must be at most 20 characters long",
                }),
        },
    };

    const [inputs, setInputs] = useState(inputDataStructure);

    const handleChange = (data, input) => {
        input.data = data;

        const { error } = input.validation.validate(data);
        input.error = error ? error.details[0].message : null;

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
    };

    const actionBtns = (Event) => {
        return (
            <div className="flex">
                <Button
                    text="view"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                />
            </div>
        );
    };
    const columns = [
        {
            title: "Event Title",
            dataIndex: "title",
            key: "title",
            align: "center",
            width: "30%",
            sorter: (a, b) => a.title.localeCompare(b.title),
        },

        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            align: "center",
            width: "30%",
        },

        {
            title: "Operations",
            dataIndex: "",
            key: "operations",
            align: "center",
            width: "30%",
            render: (arg) => actionBtns(arg),
        },
    ];

    const refreshEvents = () => {
        try {
            getEvents().then((data) => {
                setEvents(data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        refreshEvents();
        const intervalId = setInterval(refreshEvents, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const validate = (keys) => {
        let input_list = { ...inputs };

        let valid = true;

        keys.forEach((key) => {
            let input = input_list[key];

            const { error } = input.validation.validate(input.data);

            if (error) {
                input.error = error.details[0].message;
                valid = false;
            } else {
                input.error = null;
            }
        });

        setInputs(input_list);
        return valid;
    };

    const handleSubmit = async () => {
        const event = window.event;
        event.preventDefault();

        const formData = new FormData();

        if (!validate(["title"])) {
            toast.error("Title is required!");
            return;
        }

        formData.append("title", inputs.title.data);

        try {
            const result = await createEvent(formData);
            toast.success("Event created successfully!");
        } catch (e) {
            toast.error(e);
        }
    };

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
                        <Link to="/profile/logout">
                            <Button
                                className={"bg-[#761bd7] text-white"}
                                text="Logout"
                                handleClick={() => {}}
                            />
                        </Link>
                    </div>
                </header>
                <body className="w-[70%] mx-auto bg-white px-5 py-5 rounded-md">
                    <div className="mt-2">
                        <Input
                            input={inputs.title}
                            handleChange={handleChange}
                        />

                        <Button
                            handleClick={handleSubmit}
                            className="mt-6"
                            text={"Create"}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <Table
                            columns={columns}
                            dataSource={events}
                            style={{ width: "100%" }}
                        />
                    </div>
                </body>
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

export default Events;
