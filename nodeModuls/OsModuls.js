const os = require('os')
function osModuls(req,res){
        console.log(os.platform());
        console.log(`CPU Info: Returns array of CPU cores  ${os.cpus()}`);
        console.log(`Network Interfaces: ${os.networkInterfaces()}`);
        res.setHeader('Content-Type', 'text/html')
        res.write(`<div>
            <p>Used for writing cross-platform code ${os.platform()}</p>
            <p>CPU Architecture: ${os.arch()}</p>
            <p>Free Memory: ${os.freemem()}</p>
            <p>Total Memory: ${os.totalmem()}</p>
            <p>Uptime: ${os.uptime()}</p>
            <p>Hostname: ${os.hostname()}</p>
            <p>Home Directory: ${os.homedir()}</p>
            <p>Temporary Directory: ${os.tmpdir()}</p>
            <p></p>
            </div>`)
        res.end()
}

module.exports = osModuls