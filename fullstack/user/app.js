const http = require('http')
const userReduestHandler = require('./Parsing')
// const server = http.createServer(userReduestHandler)
const server = http.createServer(userReduestHandler)

server.listen(3000,()=>{
    console.log('Server port number is 3000')
})