import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

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
