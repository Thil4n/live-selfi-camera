const nodemailer = require("nodemailer");
const emailConfig = require("../config/email");
const axios = require("axios");

const send = (phoneNumber, txtBody) => {
    return new Promise((resolve, reject) => {
        const number = "94" + phoneNumber.substring(1);
        const url =
            "https://app.notify.lk/api/v1/send?user_id=14393&api_key=SeHLaolX6Fa6W3iDWkEv&sender_id=NotifyDEMO&to=" +
            number +
            "&message=" +
            txtBody;
        console.log(number);
        console.log(txtBody);

        axios
            .get(url)
            .then((response) => {
                if (response.status == 200) {
                }
            })
            .catch((e) => {});

        return resolve(true);
    });
};

module.exports = {
    send,
};
