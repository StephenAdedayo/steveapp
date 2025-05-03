import express from  'express'
import authUser from '../middlewares/auth.js'
import  {placeOrder, allOrders, userOrders, updateStatus, placeOrderStripe, verifyStripe}  from '../controllers/orderControllers.js'
import authAdmin from '../middlewares/adminAuth.js'

const orderRouter = express.Router()



orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/allOrders', authAdmin, allOrders)
orderRouter.post('/userOrder', authUser, userOrders)
orderRouter.post('/updateStatus', authAdmin, updateStatus)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/verify', authUser, verifyStripe)


export default orderRouter