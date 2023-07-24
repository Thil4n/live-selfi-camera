import Axios from "axios";
import { host } from "./host";

export const counts = (data) => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "stat", data)
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
