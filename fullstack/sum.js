const sumRequestHandler = (req, res) => {
    console.log("In sum Request Handler", req.url)
    const body = []
    req.on('data', chunk => {
        body.push(chunk)
    })
    req.on('end', () => {
        const fullbody = Buffer.concat(body).toString();
        const params = new URLSearchParams(fullbody)
        const bodyObj = Object.fromEntries(params)
        const result = Number(bodyObj.first) + Number(bodyObj.second);
        console.log(result)
        res.setHeader('Content-Type', 'text/html')
        res.write(`
            <html>
               <head>
                <title>Practise Set</title>
               </head>
               <Body>
                  <h1>Your Sum Is :${result}</h1>
               </Body>
            </html>
            `)
            return res.end()
    });

}

exports.sumRequestHandler = sumRequestHandler