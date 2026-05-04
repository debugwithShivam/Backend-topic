//npm i ws
const WebSockets = require('ws')

const server = new WebSockets.Server({ port: 8080 });

const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  console.log("Connected to server");
  socket.send("Hello server");
};

socket.onmessage = (event) => {
  console.log("Server:", event.data);
};

socket.onclose = () => {
  console.log("Connection closed");
};

socket.onerror = (err) => {
  console.log("Error:", err);
};
console.log('WebSocket server running at ws://localhost:8080');