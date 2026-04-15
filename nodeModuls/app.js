const http = require('http')
const dotenv = require('dotenv')
const fileSystemModuls = require('./FileSystemModule')
const pathModulsFunction = require('./pathModuls')
const odModuls = require('./OsModuls')
const queryParms = require('./url')
const processFun = require('./process')
// const { url } = require('inspector')
const url = require('url')

dotenv.config()

// let server = http.createServer(fileSystemModuls)
// let server = http.createServer(pathModulsFunction)
// let server = http.createServer(queryParms)
// let server = http.createServer(processFun)
let server = http.createServer((req,res)=>{
  const parsedUrl = url.parse(req.url,true)
  const pathName = parsedUrl.pathname
  if(req.url == '/'){
    res.setHeader('Content-Type','text/html')
    res.write('<h2>Hello World</h2>')
    res.end()
  }else if(req.url == '/home'){
    res.setHeader('Content-Type','text/html')
    res.write('<h2>Welcome to Home Page</h2>')
    res.end()

  }
})

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})