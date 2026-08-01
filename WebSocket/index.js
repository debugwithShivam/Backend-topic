import express from 'express'
import { createServer } from 'node:http'
import path from 'node:path'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server);

app.use(express.static('public'))

app.get('/', (req, res) => {
    return res.sendFile('index.html')
})

io.on('connection', (socket) => {
    console.log("A user connection", socket.id)
    socket.on('message', (msg) => {
        console.log(msg)
        io.emit("message", msg)
    })
})


socket.on('disconnect', () => {
    console.log('user disconnect',server.id)
})

server.listen(3000, () => {
    console.log('server runing at 3000 port')
})