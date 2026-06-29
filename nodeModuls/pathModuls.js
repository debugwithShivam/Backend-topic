// The path module in Node.js is used to handle and manipulate file paths safely.
const path = require('path')
const fs = require('fs')
function pathModulsFunction(req,res){
    const filePath = path.join(__dirname,'router','file.txt')
    fs.readFile(filePath,(err,data)=>{
        if(err){
            res.end('Error Loading File');
            return
        }
        res.writeHead(200,{'Content-type':'text/plain'})
        res.end(data);
    })
}

module.exports = pathModulsFunction