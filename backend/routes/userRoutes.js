import express from 'express'
import { getAllUsers, loginAdmin, loginUser, registerUser } from '../controllers/userControllers.js'
import authAdmin from '../middlewares/adminAuth.js'


const userRouter = express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', loginAdmin)
userRouter.get('/users', authAdmin, getAllUsers)


export default userRouter