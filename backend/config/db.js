import mongoose from "mongoose";

const connectDB = async () => {

//     mongoose.connection.on('connected', () => {
//         console.log('DB connected');
        
//     })

//     await mongoose.connect(`${process.env.MONGO_URI}`)

// }
try {
    const connect = await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log(`db connected :${connect.connection.host}`);
    
} catch (error) {
    throw new Error(error.message)
    // console.log(error.message);
    
}
}
export default connectDB