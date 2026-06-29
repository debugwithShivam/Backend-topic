function testOne(req,res) {
    let urlPath = new URL(req.url, `http://${req.headers.host}`)
    const pathName = urlPath.pathname
    let parts = pathName.split('/')
    console.log()

    // console.log(req.url, req.headers.host)

    res.setHeader("Content-type", 'text/html')
    if (pathName === '/') {
        let name = urlPath.searchParams.get('name')
        res.write(`<h2>Hello world and my name is ${name}</h2>`)
        res.end()
    } else if (pathName === '/home') {
        res.write('<h2>welcome on Home Page</h2>')
        res.end()
    } else if (pathName.startsWith('/sum/')) {
        if (parts.length !== 4) {
            res.end('<h2>Invalid URL format</h2>');
            return;
        }
        let a = Number(parts[2])
        let b = Number(parts[3])
        if (isNaN(a) || isNaN(b)) {
            res.end('<h2>Invalid numbers</h2>')
            return
        }
        let sum = a + b
        console.log(a, b)
        res.write(`<h2>Sum of A ${a} and B ${b} is ${sum}</h2>`)
        res.end()
    } else if (parts[1] === 'id' && parts[2] && parts.length === 3) {
        // let userId = urlPath.searchParams.get('id')
        let userId = parts[2]
        res.write(`Your userId is ${userId}`)
        res.end()
    } else {
        res.statusCode = 404
        res.end('Page Not Found')
    }
}

module.exports = testOne