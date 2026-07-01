import {Router} from 'express'
import singIn from '../controllers/auth.controller.js'
import checkAuth from '../controllers/checkAuth.controller.js'

const authRouter = Router()

authRouter.post('/singin',singIn)
authRouter.get('/checkAuth',checkAuth)

export default authRouter
