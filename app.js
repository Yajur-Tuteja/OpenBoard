const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public"));

// Create HTTP server explicitly
const server = http.createServer(app);

// Create Socket.IO server using the modern Server class
const io = new Server(server);

// Handle connection errors
io.on("connect_error", (err) => {
  console.log(`Connection error: ${err.message}`);
});

// Handle new socket connections
io.on("connection", (socket) => {
  console.log("Made socket connection:", socket.id);

  // Listen for drawing events
  socket.on("beginPath", (data) => {
    io.emit("beginPath", data); // broadcast to all clients
  });

  socket.on("drawStroke", (data) => {
    io.emit("drawStroke", data);
  });

  socket.on("undoRedo", (data) => {
    io.emit("undoRedo", data);
  });

  // Optional: handle disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});