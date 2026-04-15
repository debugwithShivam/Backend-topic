function queryParms(req,res){
console.log(req.url)
  // console.log(req.headers)
  // console.log(req.headers.host)

  const baseURL = `http://${req.headers.host}`
  const myUrl = new URL(req.url, baseURL)

  const pathName = myUrl.pathname
  const pathParts = pathName.split('/');

  if (pathName === '/favicon.ico') {
    res.end();
    return;
  }

  if (pathName == '/') {
    res.setHeader('Content-type', 'text/html')
    const name = myUrl.searchParams.get('name');
    const age = myUrl.searchParams.get('age');
    const role = myUrl.searchParams.get('role');
    res.write(` Name: ${name}, Age: ${age} and here Role is ${role}`)
    res.end()
  } else if (pathParts[1] == 'user') {
    const userId = pathParts[2];
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`User ID: ${userId}`);
  } else if (pathName == '/home') {
    const userId = pathParts[2];
    const userID = myUrl.searchParams.get('userId')
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`User ID: ${userID}`);
  }
}

module.exports = queryParms