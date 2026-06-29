const http = require('http')
const testingSyntax = require('./syntax')
const { Buffer } = require('buffer')
// const server = http.createServer((req,res)=>{
//     console.log(req)
// })
const server = http.createServer((req, res) => {
    process.nextTick(() => {
        process.nextTick(() => {
            setImmediate(() => {
                console.log('i am setTimeout from nextTick')
            }, 100)
        })
    })
    setImmediate(() => {
        console.log('hello from setTimeout')
    }, 1000)
    // console.log('start')
    //  setTimeout(() => {
    //     console.log('hello from setTimeout')
    // }, 1000)
    // process.nextTick(()=>{
    //     console.log('1')
    // })
    // Promise.resolve().then(()=>{
    //     console.log('2')
    // })
    // console.log('end')
    if (req.url === '/') {
        res.write('<h1>Hello</h1>')
        res.end()
    }
})

server.listen(3000, () => {
    console.log('Server port number is 3000')
})