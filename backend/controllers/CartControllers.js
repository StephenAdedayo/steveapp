import userModel from '../models/userModel.js'



const addToCart = async (req, res) => {

    try {
        // require userId, itemId and size
        const {userId, itemId, size} = req.body

        // finds user by id first
        const userData = await userModel.findById(userId)
        // find the cartdata of the user
        let cartData = await userData.cartData
         
        //  checks if itemId is in the cartData already
        if(cartData[itemId]){
            // if it is, increase it with it's particular size by 1
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
                //else it set it = 1 
            }else{
                cartData[itemId][size] = 1
            }

        }else{
            // if the item does not exist at all, create a new instance of the item object
            cartData[itemId] = {}
            // set the item = 1
            cartData[itemId][size] = 1
        }

        // usermodel finds by id and update the cart data based on a single user
        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success:true, message: "item added to cart"})
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }


}


const updateCart = async (req, res) => {

    try {
        const {userId, itemId, size, quantity} = req.body

        const userData = await userModel.findById(userId)

        const cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success: true, message: "cart updated"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }

}

const getUserCart = async (req, res) => {


    try {
        const {userId} = req.body

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData


        res.json({success: true, cartData})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message : error.message})
        
    }

}


export {addToCart, getUserCart, updateCart}