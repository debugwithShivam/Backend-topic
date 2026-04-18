const http = require('http')
const url = require('url')
const textOne = require('./text-one')
const customMiddleware = require('./middleware')

const server = http.createServer(textOne)

server.listen(3000, () => {
    console.log(`Your server on 3000 Port`)
})