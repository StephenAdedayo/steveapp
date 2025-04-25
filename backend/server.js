import express from 'express'
import  cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


const server = express()

const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

server.use(express.json())
server.use(cors())

server.use('/api/users', userRouter)
server.use('/api/product', productRouter )
server.use('/api/cart', cartRouter )
server.use('/api/order', orderRouter )



server.get('/', (req, res) => {
 res.json({msg: 'API WORKING'})
})

server.listen(port, () => {
    console.log('server started successfully on', port);
})