const http = require('http')
const dotenv = require('dotenv')
const fileSystemModuls = require('./FileSystemModule')
const pathModulsFunction = require('./pathModuls')
const odModuls = require('./OsModuls')
const queryParms = require('./url')
const processFun = require('./process')

dotenv.config()

// let server = http.createServer(fileSystemModuls)
// let server = http.createServer(pathModulsFunction)
// let server = http.createServer(queryParms)
let server = http.createServer(processFun)

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})