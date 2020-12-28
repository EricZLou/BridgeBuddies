import express from "express";
import path from "path";
import http from "http";
import {Server} from "socket.io";
import SocketManager from "./SocketManager.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8000;

// app.use(express.static(path.join(__dirname, '/../../build')));
io.on('connection', SocketManager);

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
