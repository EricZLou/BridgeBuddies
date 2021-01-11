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

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
app.use(express.static(path.join(__dirname, '/../../build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.js'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  })
});
io.on('connection', SocketManager);

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
