import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  // Send own ID
  socket.emit("your-id", socket.id);

  // Send current users
  io.emit("users", Array.from(io.sockets.sockets.keys()));

  socket.on("private-message", ({ targetId, message }) => {
    io.to(targetId).emit("message", {
      from: socket.id,
      text: message,
    });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);

    // Send updated users after disconnect
    io.emit("users", Array.from(io.sockets.sockets.keys()));
  });
});

server.listen(3000);