const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const server = require("./config/server");
const db = require("./config/db");

const userRouter = require("./router/userRouter");
const eventRouter = require("./router/eventRouter");
const adminRouter = require("./router/adminRouter");
const statRouter = require("./router/statRouter");

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        if (1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());

app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/admin", adminRouter);
app.use("/stat", statRouter);

app.use("/public", express.static(__dirname + "/public"));

app.listen(server.port, () => {
    console.log(`Server listening on ${server.port}`);
});

db();
