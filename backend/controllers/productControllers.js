import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";



const addProduct = async (req, res) => {

    try {
        const {name, description, price, category, subCategory, sizes, bestSeller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        console.log(name, description, price, category, subCategory, sizes, bestSeller);
        
        console.log(image1, image2, image3, image4);


        const images = [image1, image2, image3, image4].filter(item => item !== undefined)

        console.log(images);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type : 'image'})
                return result.secure_url
            })
        )


        const productData = {
            name,
            description,
            price : Number(price),
            category,
            subCategory,
            sizes : JSON.parse(sizes),
            bestSeller : bestSeller === 'true' ? true : false,
            image : imagesUrl,
            date : Date.now()

        }

        console.log(productData);
        
        
        const newProduct = new productModel(productData)

        await newProduct.save()
        
        res.json({success:true, message:'product added'})

        
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message:error.message})
        
    }

}


const listProduct = async (req, res) => {

    try {
        const product = await productModel.find({})
        if(!product){
          return res.json({success:false, message:'error occured'})
        }

        res.json({success : true, product})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }

}


const removeProduct = async (req, res) => {

    try {
        const product = await productModel.findByIdAndDelete(req.body.id)

        if(!product){
           return res.json({success : false, message:'error occured'})
        }
        res.json({success : true, message:'product deleted'})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }
} 

const singleProduct = async (req, res) => {

    try {
        const {productId} = req.body

        const product = await productModel.findById(productId)
        if(!product){
            return res.json({success: false, message:'error occured'})
        }

        res.json({success: true, data : product})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
        
    }

}




export {addProduct, listProduct, removeProduct, singleProduct}