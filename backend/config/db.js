import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex:true
        })
        // console.log(`mogodb connected: ${conn.connection.host}`);
        console.log(`mogodb connected: ${conn.connection.host}`.cyan.underline);
    } catch (e)
    {
        console.log("error: ", error.red.underline.bold);
        process.exit(1);//exit after failure
    }
}

export default connectDB;