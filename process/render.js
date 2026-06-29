const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

function renderHtml(res,fileName,data=null){
      const filePath = path.join(__dirname, 'views', fileName)
        fs.readFile(filePath, 'utf-8', (err, template) => {
            if (err) {
                res.writeHead(500)
                return res.end('Server Error');
            }
            const html = ejs.render(template, { products: data });

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
}

module.exports = renderHtml

