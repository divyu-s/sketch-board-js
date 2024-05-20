import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = 3000;
const app = express();

app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  // Received data
  socket.on("beginPath", (data) => {
    // data -> data from frontend
    // Now transfer data to all connected computers
    io.sockets.emit("beginPath", data);
  });

  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  });

  socket.on("redoUndo", (track) => {
    io.sockets.emit("redoUndo", track);
  });

  socket.on("undoRedoTracker", (undoRedoObj) => {
    io.sockets.emit("undoRedoTracker", undoRedoObj);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${3000}`);
});
