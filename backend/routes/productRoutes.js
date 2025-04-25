import express from 'express'
import upload from '../middlewares/multer.js'
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productControllers.js'
import authAdmin from '../middlewares/adminAuth.js'


const productRouter = express.Router()


productRouter.post('/add', authAdmin, upload.fields([{name : 'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name:'image3', maxCount:1}, {name:'image4', maxCount:1}, ]), addProduct)
productRouter.get('/list', listProduct)
productRouter.post('/remove', authAdmin, removeProduct)
productRouter.get('/single', singleProduct)


export default productRouter