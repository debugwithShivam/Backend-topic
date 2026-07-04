import {Router} from 'express'
import singIn from '../controllers/auth.controller.js'
import checkAuth from '../controllers/checkAuth.controller.js'
import insertproduct from '../controllers/insert.controller.js'
import getproductController from '../controllers/getproduct.controller.js'
import cartProduct from '../controllers/cartProduct.controller.js'
import getCartProductdata from '../controllers/getcarProduct.controller.js'

const authRouter = Router()

authRouter.post('/insert-product',insertproduct)
authRouter.post('/cartProduct',cartProduct)
authRouter.post('/singin',singIn)
authRouter.get('/checkAuth',checkAuth)
authRouter.get('/getProduct',getproductController)
authRouter.get('/getCartProduct',getCartProductdata)

export default authRouter
