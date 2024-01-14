// const express = require("express");
// const socket = require("socket.io");

// const app = express(); // initialize and server ready

// app.use(express.static("public"));

// let port = process.env.PORT || 5000;
// let server = app.listen(port, () => {
//     console.log("Listening to port " + port);
// });

// let io = socket(server);

// io.sockets.on("connect_error", (err) => {
//     console.log(`connect_error due to ${err.message}`);
// });

// io.sockets.on("connection", (socket) => {
//     console.log("Made socket connection");

//     // Received data
//     socket.on("beginPath", (data) => {
//         // transfer data to all connected devices
//         io.sockets.emit("beginPath", data);
//     });

//     socket.on("drawStroke", (data) => {
//         // transfer data to all connected devices
//         io.sockets.emit("drawStroke", data);
//     });

//     socket.on("undoRedo", (data) => {
//         // transfer data to all connected devices
//         io.sockets.emit("undoRedo", data);
//     });
// });


