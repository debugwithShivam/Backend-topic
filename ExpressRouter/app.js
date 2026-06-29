import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import hostRouter from './routes/hostRouter.js'
import path from "path";
import rootDir from "./utils/pathUtils.js";
import { fileURLToPath } from "url";

let __filename = fileURLToPath(import.meta.url)
let __dirname = path.dirname(__filename)

// Initialization
let app = express();

// Middleware
app.use(morgan("dev"));
dotenv.config();
app.use(express.urlencoded({extended:true}))
// app.use(bodyParser.urlencoded());
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});



// Local Module
app.use(userRouter)
app.use('/host',hostRouter)

app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(__dirname,'views','routerNotFound.html'))
})


app.listen(process.env.PORT, () => {
  console.log(`server port number is ${process.env.PORT}`);
});
