/*
const fs = require('fs');
🔥 इसका सीधा मतलब
👉 fs = fs module
👉 require('fs') = Node को बोल रहे हो:
“मुझे file system से काम करने वाले functions दे”


⚙️ fs module क्या है?
👉 यह Node का built-in module है
👉 इसका काम:
1)file पढ़ना (read)
2)file लिखना (write)
3)delete करना
4)rename करना
*/


const http = require('http')
const fs = require('fs')

fs.readFile('file.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('Error:', err)
        return
    }
    console.log(data)
})

// const server = http.createServer((req,res)=>{
//     fs.readFile('file.txt','utf-8',(err,data)=>{
//         if(err){
//             res.end('Error Loading File')
//             return;
//         }

//         res.writeHead(200,{'content-type':'text/html'})
//         res.write(`
//             <h1>Quotes</h1>
//             <pre>${data}</pre>
//             `)
//             res.end()
//     })
// })

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('e-commers.html', (err, data) => {
            if (err) {
                res.end('Error Loading File')
                return;
            }

            res.writeHead(200, { 'content-type': 'text/html' })
            res.write(data)
            res.end()
        })
    } else if (req.url === '/quotes') {
        fs.readFile('file.txt', 'utf-8', (err, data) => {
            if (err) {
                res.end('Error Loading File')
                return
            }
            res.writeHead(200, { 'content-type': 'text/html' })
            res.write(`
            <h1>Quotes</h1>
            <pre>${data}</pre>
            `)
            res.end()
        })
    }

})

server.listen(3000, () => {
    console.log('Servefr running on http://localhost:3000')
})