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

// const server = net.createServer((socket) => {
//   socket.on("data", (data) => {
//     console.log("RAW DATA:\n");
//     console.log(data.toString()); // 👈 yahan asli HTTP dikhega

//     // manual HTTP response bhejna padega
//     socket.write(
//       "HTTP/1.1 200 OK\r\n" +
//       "Content-Type: text/html\r\n" +
//       "Content-Length: 12\r\n" +
//       "\r\n" +
//       "Hello World!"
//     );

//     socket.end();
//   });
// });

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on('data', (data) => {
    const msg = data.toString().trim();
    console.log("Received:", msg);

    socket.write(
      "HTTP/1.1 200 OK\r\n" +
      "Content-Type: text/plain\r\n" +
      "Content-Length: 12\r\n" +
      "\r\n" +
      "Hello World!"
    );
    socket.end();
  });

  socket.on('end', () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})