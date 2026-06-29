import {Router} from 'express'
import singIn from '../controllers/auth.controllers.js'

const authRouter = Router()

authRouter.post('/singin',singIn)

export default authRouter
