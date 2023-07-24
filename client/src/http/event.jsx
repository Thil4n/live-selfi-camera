import Axios from "axios";
import { host } from "./host";

export const createEvent = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post(host + "event", data)
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

export const getEvents = () => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "event")
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

export const updateEvent = (data) => {
    return new Promise((resolve, reject) => {
        Axios.patch(host + "event", data)
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

export const deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(host + "event/" + id)
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
