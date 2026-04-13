const http = require('http')
const dotenv = require('dotenv')
const fileSystemModuls = require('./FileSystemModule')
const pathModulsFunction = require('./pathModuls')
const odModuls = require('./OsModuls')
const queryParms = require('./url')

dotenv.config()

// let server = http.createServer(fileSystemModuls)
// let server = http.createServer(pathModulsFunction)
let server = http.createServer(queryParms)

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})