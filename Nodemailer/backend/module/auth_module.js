import mongoose from "mongoose";

const authDB = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        default: null
    },

    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    picture: {
        type: String,
        default: ""
    },

    otp: String,

    otpExpire: Date,

    isVerified: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

export default mongoose.model("Login", authDB);