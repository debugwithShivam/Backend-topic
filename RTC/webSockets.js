//npm i ws
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const clients = new Set()
server.on("connection", (socket) => {
  console.log("Client Connected");

  clients.add(socket)
  socket.send("Welcome!");
  socket.on("message", (msg) => {
    const text = msg.toString();
    console.log("Message:", text);
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });
  socket.on("close", () => {
    console.log("Client Disconnected");
    clients.delete(socket); // remove
  });
});

console.log("ws://localhost:8080");