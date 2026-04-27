const http = require('http');
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const data = require('./data')
const renderHtml = require('./render')

let cart = [];

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        renderHtml(res, 'index.ejs', data)
    } else if (req.url === '/cart') {
        renderHtml(res, 'cart.ejs',cart)
    } else if (req.url === '/create') {
        renderHtml(res, 'create.ejs')
    } else if (req.url === '/add-to-cart' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const param = new URLSearchParams(body);
            const product = param.get('product')
            const productPrice = param.get('price')
            const productRating = param.get('rating')
            let productData = {
                product: product,
                price: productPrice,
                rating: productRating
            };
            if (product && productPrice && productRating) {
                cart.push(productData)
            }
            res.writeHead(302, { Location: '/cart' }); 
            res.end();
        })
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000);