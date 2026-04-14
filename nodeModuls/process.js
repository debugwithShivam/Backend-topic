function processfun(req, res) {
    const command = process.argv.slice('')
    const argv = command[2]
    const ShowRamUsage = JSON.stringify(process.memoryUsage())
    process.nextTick(() => {
        console.log('Runs before next event loop');
    });
    
    if (req.url == '/') {
        // console.log(process)
        console.log(process.env.PORT)
        res.setHeader('Content-type', 'text/html')
        res.write(`
            <div>
            <h2>.env file Data: ${process.env.PORT}</h2>
            <h2>Where Node is running from :${process.cwd()}</h2>
            <h2>Unique process ID (given by OS) :${process.pid}</h2>
            <h2>process.argv is ${argv || 'Please provide a command'}</h2>
            <h2>Shows RAM usage :${JSON.stringify(process.memoryUsage())}</h2>
            <h2>How long process is running :${process.uptime()}</h2>
            <h2>Node version :${process.version}</h2>
            <h2>Platform (OS) :${process.platform}</h2>
            <h2>Architecture (OS) :${process.arch}</h2>
            </div>
            `)
        res.end()
    }
}

module.exports = processfun