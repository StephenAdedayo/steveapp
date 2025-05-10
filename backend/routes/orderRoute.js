import express from  'express'
import authUser from '../middlewares/auth.js'
import  {placeOrder, allOrders, userOrders, updateStatus, placeOrderStripe, verifyStripe, placeOrderPaystack, verifyPaystackPayment, verifyFlutterwavePayment, placeOrderFlutterwave}  from '../controllers/orderControllers.js'
import authAdmin from '../middlewares/adminAuth.js'

const orderRouter = express.Router()



orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/allOrders', authAdmin, allOrders)
orderRouter.post('/userOrder', authUser, userOrders)
orderRouter.post('/updateStatus', authAdmin, updateStatus)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/verify', authUser, verifyStripe)
orderRouter.post("/paystack", authUser, placeOrderPaystack);
orderRouter.post("/verifystack", authUser, verifyPaystackPayment);
orderRouter.post("/verifyflutterwave", authUser, verifyFlutterwavePayment);
orderRouter.post("/flutterwave", authUser, placeOrderFlutterwave);


export default orderRouter