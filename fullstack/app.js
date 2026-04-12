const http = require('http')
const userReduestHandler = require('./Parsing')
const calculatorProject = require('./calculator')
// const server = http.createServer(userReduestHandler)
const server = http.createServer(calculatorProject)

server.listen(3000,()=>{
    console.log('Server port number is 3000')
})