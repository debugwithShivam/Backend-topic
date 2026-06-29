const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const { json } = require('stream/consumers')

const requestHandler = (req, res) => {


    if (req.method === 'GET' && req.url === '/') {
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
    } else if (req.method === 'POST' && req.url === '/submit') {

        let body = []
        req.on('data', chunk => {
            body.push(chunk)
        })

        req.on('end', () => {
            const fullbody = Buffer.concat(body).toString();
            const params = new URLSearchParams(fullbody)
            const bodyObject = Object.fromEntries(params)
            console.log(bodyObject)
            //  BLOCKING EVERYTHING 
            //  fs.writeFileSync('user.txt',JSON.stringify(bodyObject)) <--- this is Sync Methid (writeFileSync)
            fs.writeFile('user.txt', JSON.stringify(bodyObject), (error) => {
                if (error) {
                    console.error('Write failed:', error);
                    res.statusCode = 500;
                    return res.end('Internal Server Error');
                }

                console.log('Data written successfully');

                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });//<--this is Async Methos writeFile
        })
    }
    else {
        res.setHeader('content-type', 'text/html')
        res.write(`
       <html>
        <head>
                <title>Practise Set</title>
               </head>
               <Body>
                  <h1>404 Page Dose not Exist</h1>
                  <a href='/'>Go to Home</a>
               </Body>
       </html>

    `)
    }
    res.end('404 - Page Nahi Mila!')


}

module.exports = requestHandler



