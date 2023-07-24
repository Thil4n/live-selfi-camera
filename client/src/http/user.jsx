import Axios from "axios";
import { host } from "./host";

export const login = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post(host + "user/login", data)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};

export const register = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post(host + "user/register", data)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "user")
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};

export const getuser = (id) => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "user/" + id)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};

export const createUser = (data) => {
    const config = {
        hedoctorers: {
            "Content-Type": "multipart/form-data",
        },
    };
    return new Promise((resolve, reject) => {
        Axios.post(host + "user", data, config)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                console.log(e.request);
                return reject(e.response.data.message);
            });
    });
};

export const updateUser = (data) => {
    const config = {
        hedoctorers: {
            "Content-Type": "multipart/form-data",
        },
    };
    return new Promise((resolve, reject) => {
        Axios.patch(host + "user", data, config)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};

export const updateProfile = (data) => {
    return new Promise((resolve, reject) => {
        Axios.patch(host + "user/profile", data)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};
export const updatePassword = (data) => {
    return new Promise((resolve, reject) => {
        Axios.patch(host + "user/password", data)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};

export const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(host + "user/" + id)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};
