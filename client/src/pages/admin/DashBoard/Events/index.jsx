import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";

import { getEvents, deleteEvent } from "../../../../http/event";
import EventModal from "./EventModal";

import { Input, Select, Button, Confirm } from "../../../../components/ui";

const EventList = () => {
    const [Categories, setCategories] = useState([]);
    const [dataModalState, setDataModalState] = useState(false);
    const [confirmModalState, setConfirmModalState] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const inputDataStructure = {
        query: {
            key: "query",
            label: "",
            placeholder: "Search",
            value: "",
            type: "text",
            isValid: true,
            error: "",
        },
    };

    const [inputs, setInputs] = useState(inputDataStructure);

    const handleEdit = (Event) => {
        setSelectedEvent(Event);
        setDataModalState(true);
    };

    const handleDelete = async () => {
        console.log(selectedEvent);
        try {
            await deleteEvent(selectedEvent.id);
            setConfirmModalState(false);
            refreshCategories();
            setSelectedEvent(null);
            toast.success("Event deleted successfully");
        } catch (e) {}
    };

    const handleCloseModal = () => {
        refreshCategories();
        setDataModalState(false);
        setConfirmModalState(false);
        setSelectedEvent(null);
    };

    const handleChange = (e, input) => {
        input.value = e.target.value;
        input.is_valid = e.target.value ? true : false;
        input.error = e.target.value ? "" : "Please input the password";

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
    };

    const refreshCategories = () => {
        try {
            getEvents(Categories).then((data) => {
                setCategories(data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        refreshCategories();
        const intervalId = setInterval(refreshCategories, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const actionBtns = (Event) => {
        return (
            <div className="flex">
                <Button
                    text="Delete"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => {
                        setSelectedEvent(Event);
                        setConfirmModalState(true);
                    }}
                />

                <Button
                    text="Edit"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => handleEdit(Event)}
                />
            </div>
        );
    };
    const qrCode = (event) => {
        return <QRCode value={event.code} />;
    };

    const columns = [
        {
            title: "#",
            width: "10%",
            render: (arg) => {
                return <p className="text-center">7</p>;
            },
        },
        {
            title: "Event Title",
            dataIndex: "title",
            key: "title",
            align: "center",
            width: "30%",
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "QR code",
            align: "center",
            width: "30%",
            render: (arg) => qrCode(arg),
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

    return (
        <section className="w-full">
            {dataModalState && (
                <EventModal
                    handleClose={handleCloseModal}
                    selectedEvent={selectedEvent}
                />
            )}
            {confirmModalState && (
                <Confirm
                    cancelHandler={handleCloseModal}
                    confirmHandler={handleDelete}
                />
            )}
            {/* <div className="grid grid-cols-3 gap-3 bg-white px-2 py-2 mb-3 rounded-md">
                <div className="col-span-2">
                    <Input input={inputs.query} handleChange={handleChange} />
                </div>
                <div>
                    <Button
                        text={"Add new"}
                        handleClick={() => setDataModalState(true)}
                    />
                </div>
            </div> */}
            <Table
                columns={columns}
                dataSource={Categories}
                style={{ width: "100%" }}
            />
        </section>
    );
};

export default EventList;
