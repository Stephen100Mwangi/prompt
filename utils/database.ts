import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async()=>{
    mongoose.set('strictQuery',true) // Set Mongoose options to avoid warnings on the console.

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in the environment variables");
        }
        await mongoose.connect(uri, {
            dbName: "shareprompt",
        });

        isConnected = true;
        console.log('MongoDB connected successfully ✅✅✅');
        
    } catch (error) {
        console.log(error);
        
    }
}