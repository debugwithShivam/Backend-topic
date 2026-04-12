const http = require('http')
const querystring  = require('querystring')
const fs = require('fs')
const { json } = require('stream/consumers')

const requestHandler = (req, res) => {


    if (req.method === 'GET' &&req.url === '/') {
        console.log(process)
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(`
       <form action="/submit" method="post">
    
    <!-- Username -->
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    <br><br>
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <br><br>
    
    <label for="gender">Gender:</label>
    <select id="gender" name="gender" required>
      <option value="">--Select--</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
    <br><br>
    
    <input type="submit" value="Register">
  </form>

    `)
        res.end();
    } else if(req.method === 'POST' && req.url === '/submit'){

        let body = []
        req.on('data',chunk=>{
            body.push(chunk)
            // console.log(chunk)
        })

        req.on('end',()=>{
         const fullbody =  Buffer.concat(body).toString();
         const params = new URLSearchParams(fullbody)

        //  first way 
        //  const bodyObject = {}
        //  for(const [key, val] of params.entries()){
            //     bodyObject[key] = val
            //  }
            //  console.log(bodyObject)
         //  Second way 
         const bodyObject = Object.fromEntries(params)
         console.log(bodyObject)
         fs.writeFileSync('user.txt',JSON.stringify(bodyObject))
        })
    } 
    else if (req.url === '/about') {
        res.writeHead(200, { 'content-type': 'text/plain' })
        res.end('Yeh About Page hai!')
    } 
    else if(req.url == '/user'){
        fs.readFile('user.txt','utf-8',(err,data)=>{
            if(err){
                res.end('Error Loading File')
                return
            }
            res.writeHead(200,{'content-type':'text/html'})
            res.write(`
                <h1>User</h1>
                <pre>${data}</pre>
                `)
        })
    }
    else {
        res.writeHead(404, { 'content-type': 'text/plain' })
        res.end('404 - Page Nahi Mila!')
    }

    
}

module.exports = requestHandler


// server.listen(3000, () => {
//     console.log('Server chal raha hai port 3000 pe!');
// });




//how async opration work in node.js
