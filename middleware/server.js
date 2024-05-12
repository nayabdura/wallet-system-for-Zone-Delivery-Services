// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle data received from clients
  socket.on('updateProduct', (data) => {
    console.log('Received updateProduct event:', data);
    // Broadcast the data to all connected clients
    io.emit('productUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});
