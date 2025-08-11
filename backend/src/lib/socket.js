import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Dynamic CORS origins for socket.io
const allowedOrigins = process.env.NODE_ENV === "production" 
  ? [process.env.FRONTEND_URL || "https://your-app-name.onrender.com"]
  : ["http://localhost:5173"];

// used to store online users
const userSocketMap = {}; // { userId: socketId }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // send updated online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
