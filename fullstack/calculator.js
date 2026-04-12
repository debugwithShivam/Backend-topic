const {sumRequestHandler} = require('./sum')
const calculatorProject = (req, res) => {
    console.log(req.url, req.method)
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write(`
            <html>
               <head>
                <title>Practise Set</title>
               </head>
               <Body>
                  <h1>Welcome to calculator</h1>
                  <a href='/calculator'>Go to calculator</a>
               </Body>
            </html>
            `)
    } else if (req.url.toLowerCase() === '/calculator') {
        res.setHeader('Content-Type', 'text/html')
        res.write(`
            <html>
               <head>
                <title>Practise Set</title>
               </head>
               <Body>
                  <h1>Here is the calculator</h1>
                  <form action="/calculator-result" method="POST">
                  <input type="text" placeholder="First Num" name="first">
                  <input type="text" placeholder="Second Num" name="second">
                  <input type="submit" value="Submit">
                  </form>
                  </Body>
            </html>
            `)
    }else if(req.url === '/calculator-result' && req.method == 'POST'){
        return  sumRequestHandler(req,res)
    } else {
        res.setHeader('Content-Type', 'text/html')
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

    return res.end();
}

module.exports = calculatorProject      