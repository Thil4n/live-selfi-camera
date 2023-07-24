import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { toast } from "react-toastify";

import { getUsers, deleteUser } from "../../../../http/user";
import UserModal from "./UserModal";

import { Button, Confirm } from "../../../../components/ui";

const CustomerList = () => {
    const [users, setUsers] = useState([]);
    const [dataModalState, setDataModalState] = useState(false);
    const [confirmModalState, setConfirmModalState] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEdit = (User) => {
        setSelectedUser(User);
        setDataModalState(true);
    };

    const handleDelete = async () => {
        console.log(selectedUser);
        try {
            await deleteUser(selectedUser.id);
            setConfirmModalState(false);
            refreshUsers();
            toast.success("User deleted successfully");
        } catch (e) {}
    };

    const handleCloseModal = () => {
        refreshUsers();
        setDataModalState(false);
        setConfirmModalState(false);
        setSelectedUser(null);
    };

    const refreshUsers = () => {
        try {
            getUsers(users).then((data) => {
                setUsers(data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        refreshUsers();
        const intervalId = setInterval(refreshUsers, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const actionBtns = (user) => {
        return (
            <div className="flex">
                <Button
                    text="Delete"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => {
                        setSelectedUser(user);
                        setConfirmModalState(true);
                    }}
                />

                <Button
                    text="Edit"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => handleEdit(user)}
                />
            </div>
        );
    };
    const img = (avatar) => {
        return (
            <div className="flex">
                <img
                    className="w-11 h-11 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={require("../../../../assets/img/profile.png")}
                />
            </div>
        );
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "",
            key: "avatar",
            render: (arg) => img(arg.avatar),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center",
            width: "40%",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
            width: "10%",
        },

        {
            title: "Operations",
            dataIndex: "",
            key: "operations",
            align: "center",
            width: "20%",
            render: (arg) => actionBtns(arg),
        },
    ];

    return (
        <section className="w-full">
            {dataModalState && (
                <UserModal
                    handleClose={handleCloseModal}
                    selectedUser={selectedUser}
                />
            )}
            {confirmModalState && (
                <Confirm
                    cancelHandler={handleCloseModal}
                    confirmHandler={handleDelete}
                />
            )}
            <div className="grid grid-cols-3 gap-3 bg-white px-2 py-2 mb-3 rounded-md">
                <div className="col-span-2"></div>
                <div>
                    <Button
                        text={"Add new"}
                        handleClick={() => setDataModalState(true)}
                    />
                </div>
            </div>
            <Table columns={columns} dataSource={users} />
        </section>
    );
};

export default CustomerList;
