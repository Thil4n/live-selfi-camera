import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Button } from "../../../components/ui";
import { AiOutlineInstagram } from "react-icons/ai";

const Navbar = () => {
    const currentYear = new Date().getFullYear();
    const videoRef = React.useRef(null);
    const imageRef = React.useRef(null);
    const canvasRef = React.useRef(null);

    const [isStreaming, setStreaming] = useState(false);

    const socket = io("ws://localhost:8000", { cors: true });

    socket.on("stream", (data) => {
        const blob = new Blob([data], { type: "image/jpeg" });
        const imageURL = URL.createObjectURL(blob);
        console.log(imageURL);
        // Set the imageURL as the source of the image element
        imageRef.current.src = imageURL;
    });

    useEffect(() => {
        // Function to handle accessing the webcam and capturing frames
        const startCapture = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        startCapture();
    }, []);

    // Helper function to convert data URL to Blob object
    const dataURLtoBlob = (dataURL) => {
        const byteString = atob(dataURL.split(",")[1]);
        const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const startStreaming = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");

        setInterval(() => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageSrc = canvas.toDataURL("image/jpeg");
            // Convert the data URL to a Blob object
            const blob = dataURLtoBlob(imageSrc);

            const additionalData = {
                userId: "user123",
                streamId: "stream456",
            };

            const payload = {
                image: blob,
                additionalData: additionalData,
            };

            socket.emit("stream", payload);
        }, 1000 / 30); // fps = 30
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
                        <Button
                            className={"bg-[#761bd7] text-white"}
                            text="Login"
                        />
                        <Button
                            className={"bg-[#761bd7] text-white"}
                            text="Register"
                        />
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center">
                    <img
                        src={require("../../../assets/img/logo.webp")}
                        alt="Content"
                        className="mx-auto w-96"
                    />
                    <video
                        ref={videoRef}
                        style={{ display: "none" }}
                        autoPlay
                    />
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                    <Button
                        className={"bg-[#761bd7] text-white w-[30%] mt-4"}
                        text="Start Streaming"
                        handleClick={startStreaming}
                    />

                    <div>
                        <img
                            ref={imageRef}
                            autoPlay
                            muted
                            style={{ width: "100%", maxWidth: "400px" }}
                        />
                    </div>
                </main>

                <footer className="text-white p-4 text-center flex justify-between">
                    <div className="flex justify-center items-center">
                        &copy; {currentYear} FANY
                    </div>
                    <a
                        href="instagram.com/fany.app"
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

export default Navbar;
