import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/db/dataBase.js";


connectDB()

app.listen(config.port,()=>{
    console.log(`Server port on ${config.port}`)
})