import express from 'express'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import connectDB from './db/ConnectDb.js'
import authLogin from './module/auth_module.js'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import cors from 'cors'


const app = express()
app.use(cors())
dotenv.config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())



connectDB()

app.use(express.static('./view'))
app.set('view engine', 'ejs')


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

app.get('/', async (req, res) => {
    try {
        let data = await authLogin.find()
        res.json({ success: true, data: todo })
    } catch (error) {
        res.status(500).json({ mssage: error })
    }
})

app.get('/data', async (req, res) => {
    try {
        let data = await authLogin.find()
        res.json({ success: true, data: data })
    } catch (error) {
        res.status(500).json({ mssage: error })
    }
})


app.post('/account', async (req, res) => {
    const { name, email, password } = req.body
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

        let data = await authLogin.create({
            name: name,
            email: email,
            password: password,
            otp,
            otpExpire,
            isVerified: true
        })

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Email Verification",
            html: `
                <h1>OTP Verification</h1>
                <h2>${otp}</h2>
                <h1>jaldi OTP dal be bawakuuf<h1/>
                <p>This OTP will expire in 5 minutes.</p>
            `
        })
        res.json({ success: true, data: data })
    } catch (error) {
        res.status(500).json({ mssage: error })
    }
})


app.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    const user = await authLogin.findOne({ email });
    console.log(user, email)

    if (!user) {
        return res.json({
            success: false,
            message: "User not found"
        })
    }

    if (user.otp !== otp) {
        return res.json({
            success: false,
            message: "Wrong OTP"
        })
    }

    if (new Date() > user.otpExpire) {
        return res.json({
            success: false,
            message: "OTP Expired"
        })
    }

    user.isVerified = true;
    user.otp = "";
    user.otpExpire = null;
    await user.save();

    res.json({
        success: true,
        message: "Email Verified"
    });

});

const Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


app.post('/googleAuth', async (req, res) => {
    console.log(req.body);
    console.log(req.body.token);
    try {

        const ticket = await Client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        let user = await authLogin.findOne({
            email: payload.email
        });


        if (!user) {
            user = await authLogin.create({
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                googleId: payload.sub,
                provider: "google",
                isVerified: true
            });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture
            }
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
})


const post = process.env.POST || 5000
app.listen(post, () => {
    console.log(`server on Post ${post}`)
})

