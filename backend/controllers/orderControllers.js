import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import axios from 'axios'


const currency = "usd"
const deliveryCharge = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
const flutterwaveSecretKey = process.env.FLW_SECRET_KEY

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

const placeOrderStripe = async (req, res) => {

    try {
        const {userId, items, amount, address} = req.body

        // get the origin such as my domain for test "http:localhost"
        const {origin} = req.headers

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod : "stripe",
            payment : false,
            date : Date.now()
        }
    // creates a new order
        const newOrder = new orderModel(orderData)
// saves new order
        await newOrder.save()

        // maps each items a user is buying
        const line_items = items.map((item) => ({
            // stripe gets price_data by getting the currency, product data, just a product name
            price_data: {
                currency : currency,
                product_data : {
                    name : item.name
                },
                // unit amount converted to cents or kobo
                unit_amount: item.price * 100
            },
            // number of quantity cartItem[items][item] of that particular item
            quantity : item.quantity
        }))
       
        line_items.push({
            // adding delivery fee
            price_data : {
                currency : currency,
                // adding name of the product which is just delivery charge
                product_data : {
                    name : "Delivery Charges"
                },
                // converting the delivery charge to also cents or kobo
               unit_amount : deliveryCharge * 100 
            },
            // makes sure to charge for delivery fee once
            quantity : 1
        })

        // stripe format
        const session = await stripe.checkout.sessions.create({
            // origin gotten from the header and if payment successful navigate to verifify page
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            // one time payment
            mode:"payment"
        })

       res.json({success : true, session_url: session.url})

    } catch (error) {
        console.log(error.message);
        res.json({sucess : false, message : error.message})
        
    }


}


const verifyStripe = async (req, res) => {
    const {orderId, success, userId} = req.body

    try {

        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData : {}})
            res.json({success:true})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }


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

const placeOrderPaystack = async (req, res) => {
    try {
      const { userId, items, amount, email, address } = req.body;
      const { origin } = req.headers;
  
      const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod: "paystack",
        payment: false,
        date: Date.now(),
      };
  
      const newOrder = await orderModel.create(orderData);
  
      // Convert amount to kobo (for NGN)
      const totalAmount = amount*1500 * 100;
  
      const paystackRes = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email,
          amount: totalAmount,
          callback_url: `${origin}/verifystack?orderId=${newOrder._id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${paystackSecretKey}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const { authorization_url } = paystackRes.data.data;
  
      res.json({ success: true, authorization_url });
    } catch (error) {
      console.error("Paystack Init Error:", error.response?.data || error.message);
      res.json({ success: false, message: "Paystack Payment Initialization Failed" });
    }
  };
  
  const verifyPaystackPayment = async (req, res) => {
    const { reference, orderId, userId } = req.body;
  
    try {
      const verifyRes = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
        },
      });
  
      const paymentData = verifyRes.data.data;
      console.log(paymentData);
      
  
      if (paymentData.status === "success") {
        await orderModel.findByIdAndUpdate(orderId, {
          payment: true,
        });
        await userModel.findByIdAndUpdate(userId, {cartData : {}})
        res.json({success: true}); 
      } else {
        await orderModel.findByIdAndDelete(orderId)
        res.json({success:false})
      }
    } catch (error) {
      console.error("Verification error:", error.response?.data || error.message);
      res.json({success:false, message: error.message})
    }
  };

  const placeOrderFlutterwave = async (req, res) => {

    try {
      const {items, amount, address, email, userId} = req.body

    const {origin} = req.headers
     
    const orderData = {
      userId,
      amount,
      items,
      address,
      paymentMethod : "flutterwave",
      payment : false,
      date : Date.now()
    }


    const newOrder = new orderModel(orderData)

    await newOrder.save()

    const tx_ref = `TX-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const totalAmount = amount * 1500; // NGN, no need to multiply by 100 for Flutterwave


    const flutterwaveRes = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref,
        amount: totalAmount,
        currency: "NGN",
        redirect_url: `${origin}/verifywave?orderId=${newOrder._id}`,
        customer: {
          email,
          name: "Customer",
        },
        customizations: {
          title: "Royal Boutique",
          description: "Payment for items in cart",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${flutterwaveSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const {link} = flutterwaveRes.data.data

    res.json({success: true, authorization_url : link})

    


    } catch (error) {
      console.log(error.message);

      res.json({success: false, message: "Flutterwave Payment Initialization Faile"})
    }
  }


  const verifyFlutterwavePayment = async (req, res) => {
    const { transaction_id, orderId, userId } = req.body;
  
    try {
      const verifyRes = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          headers: {
            Authorization: `Bearer ${flutterwaveSecretKey}`,
          },
        }
      );
  
      const paymentData = verifyRes.data.data;
  
      if (paymentData.status === "successful") {
        await orderModel.findByIdAndUpdate(orderId, {
          payment: true,
        });
  
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
  
        res.json({ success: true });
      } else {
        await orderModel.findByIdAndDelete(orderId);
        res.json({ success: false });
      }
    } catch (error) {
      console.error("Flutterwave Verification Error:", error.response?.data || error.message);
      res.json({ success: false, message: "Payment verification failed" });
    }
  };

export {placeOrder, allOrders, userOrders, updateStatus, placeOrderStripe, verifyStripe, placeOrderPaystack, verifyPaystackPayment, placeOrderFlutterwave, verifyFlutterwavePayment}