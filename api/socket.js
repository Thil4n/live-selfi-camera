const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

let videoStream = null;

io.on("connection", (socket) => {
    console.log("A user connected");

    if (videoStream) {
        socket.emit("stream", videoStream);
    }

    socket.on("stream", (payload) => {
        console.log(payload);
        //videoStream = stream;
        socket.emit("stream", payload.image);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});
