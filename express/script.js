const express = require('express')
let app = express()



app.use((req, res, next) => {
    console.log('middleware 1 working')
        next()
});

app.use((req, res, next) => {
    console.log('middleware 2 working')
        next()
});


app.use(express.static('./public'))

app.set("view engine","ejs")

app.get('/', (req, res) => {
    res.render('index',{age:12})
})

app.get('/contect', (req, res) => {
    res.render('contect',{name:'harsh'})
})

app.get('/Profile', (req, res) => {
    res.send('Hello from Profile')
})    


            
app.get('/Profile/:username', (req, res) => {
    res.send('Hello from harsh')
})    



app.get('/account/:username', (req, res) => {
    res.send(`Hello from ${req.params.username}`)
})    
 
app.get('/about/:username/:Web', (req, res) => {
    res.send(`Hello from ${req.params.username} and the page is ${req.params.Web}`)
})    
 


app.listen(3000)