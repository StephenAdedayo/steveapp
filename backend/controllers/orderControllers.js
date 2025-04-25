import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";



const currency = "usd"
const deliveryCharge = 10


// placing order using cod method
const placeOrder = async (req, res) => {

    try {
        const {userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod : 'cod',
            payment : false,
            date : Date.now()
        }

        const newOrder = new orderModel(orderData)

        await newOrder.save()
        
        await userModel.findByIdAndUpdate(userId, {cartData : {}})
      
        res.json({success: true, message: "order placed"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }

}

const allOrders = async (req, res) => {


    try {
        const orders = await orderModel.find({})

        if(!orders){
            return res.json({success: false, message:"failed to load orders"})
        }

        res.json({success:true, orders})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }

}

const userOrders = async (req, res) => {

    try {
        const {userId} = req.body
    //   using .find must be an object
    // using findById will work but return null while find will return []
        const userOrder = await orderModel.find({userId})

        res.json({success: true, userOrder})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }

}


const updateStatus = async  (req, res) => {

    try {
        const {orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})

        res.json({success: true, message: 'status updated'})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }

}

export  {placeOrder, allOrders, userOrders, updateStatus}