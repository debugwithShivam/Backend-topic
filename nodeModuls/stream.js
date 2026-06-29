const fs = require('fs')

function stream(req, res) {
    if (req.url === '/') {
        const readable = fs.createReadStream('bada-file.txt', { encoding: 'utf8' });
        readable.on('data', (chunk) => {
            console.log('Chunk mila:', chunk)
        })
        readable.on('end', () => {
            console.log('Poora File padh liya')
        })
        readable.on('error', (err) => {
            console.log('Error:', err);
        })
    } if (req.url === '/Writable') {
        const writable = fs.createWriteStream('Output.txt');
        writable.write("Pehli line\n");
        writable.write("Doosri line\n");
        writable.end("Aakhri line");              // stream band karo

        writable.on("finish", () => {
            console.log("File likh di!");
        });
    }else if(req.url === '/Duplex'){
        
    }
    res.end()
}

module.exports = stream