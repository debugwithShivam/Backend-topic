import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"Username is required"],
        unique:[true,"Username is unique"]
    },
    email:{
        type:String,
        require:[true,"Username is required"],
        unique:[true,"Username is unique"]
    },
    password:{
        type:String,
        require:[true,"Username is required"],
    }
})

const userModel = mongoose.model("users",userSchema)

export default userModel