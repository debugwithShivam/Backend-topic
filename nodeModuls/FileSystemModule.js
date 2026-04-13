let fs = require('fs')
let fileSystemModuls = (req,res,next) =>{
    if(req.url == '/'){
         fs.readFile('index.html',(err,data)=>{
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
        res.end()
    })

    }
 
 
}

module.exports = fileSystemModuls;