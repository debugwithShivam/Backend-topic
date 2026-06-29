import userModel from "../models/user.model.js";
import crypto from 'crypto';
// npm i jsonwebtoken
import jwt from 'jsonwebtoken';
/*
 jwt ko token create karne ka liya jwt secret lag ta hai
 jwt secret ki help ka JWT token banata hai or jwt secret Token ko identify kar ta hai ki token koi another server ya wrong person sa to nahi araha hai 
*/
import config from "../config/config.js";
import statusMessage from "../status.js";
export async function registerUser(req, res) {
    const { username, email, password } = req.body;
    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email },
        ]
    });

    if (isAlreadyRegistered) {
        // res.status(409).json({ message: 'Username or email already existed' })
        statusMessage(res, 409, 'message', 'Username or email already existed')
    };

    const hashPassword = crypto.createHash('sha256').update(password).digest("hex")
    const user = await userModel.create({
        username,
        email,
        hashPassword
    });

    const token = jwt.sign(
        {
            id: user._id
        },
        config.JWTSECRET,
        {
            expiresIn: '1d'
        },
    );

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            username: user.username,
            email: user.email,
        },
        token
    })

};
