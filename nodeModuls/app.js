const http = require('http')
const dotenv = require('dotenv')
const fileSystemModuls = require('./FileSystemModule')
const pathModulsFunction = require('./pathModuls')
const odModuls = require('./OsModuls')
const queryParms = require('./url')
const processFun = require('./process')
const processStream = require('./processStream')
const stream = require('./stream')
// const { url } = require('inspector')
const url = require('url')
const net = require('net')

dotenv.config()

// let server = http.createServer(fileSystemModuls)
// let server = http.createServer(pathModulsFunction)
// let server = http.createServer(queryParms)
// let server = http.createServer(processFun)
// let server = http.createServer(processStream)
// let server = http.createServer(stream)

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on('data', (data) => {
    const msg = data.toString().trim();
    console.log("Received:", msg);

    socket.write("Server says: " + msg + "\n");
  });

  socket.on('end', () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})