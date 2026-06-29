import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()
let app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded())

app.get('/contact-us',(req,res,next)=>{
    res.send('<h1>Hello In contect</h1>') 
    // next()
})


app.get('/contact',(req,res)=>{
    res.send('<h1>Hello In express</h1>') 
})

console.log(process.env.PORT)
app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT || 8000}`)
} ) 