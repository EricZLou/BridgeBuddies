const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = module.exports.io = require("socket.io")(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8000;

const SocketManager = require("./SocketManager");

// app.use(express.static(path.join(__dirname, '/../../build')));
io.on('connection', SocketManager);

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
