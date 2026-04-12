import express from 'express'
const userRouter = express.Router()
import { fileURLToPath } from 'url';
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
userRouter.get("/", (req, res, next) => {
  console.log(req.url, req.method);
  res.sendFile(path.join(__dirname,'..','views','home.html'));
});

export default userRouter

// if you use require
// then path work like this path.join(__dirname,'../','views','home.html')
 
// -------------------------------------------------- 

// if you use import 
// the path work like this 
/*
import express from 'express'
const userRouter = express.Router()
import { fileURLToPath } from 'url';
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
userRouter.get("/", (req, res, next) => {
  console.log(req.url, req.method);
  res.sendFile(path.join(__dirname,'..','views','home.html'));
});
*/