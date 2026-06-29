const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url == '/event'){
        res.writeHead(200,{
            'content-type':'text/event-stream',
            'cache-control':'no-cache',
            'Connection':'keep-alive'
        });
        const interval = setInterval(()=>{
            res.write(`data ${Date.now()}\n\n`)
        },2000)
        res.on('close',()=>{
            setInterval(interval)
            res.end()
        })
    }else{
        res.writeHead(200)
        res.end('Server is up')
    }
})

server.listen(3000,()=>{
    console.log('server is running on port 3000')
})