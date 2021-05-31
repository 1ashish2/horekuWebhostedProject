import mongoose from "mongoose"
import dotenv from "dotenv"
//import colors from "colors"
import users from "./data/users.js"
import products from "./data/product.js"
import User from "./modals/userModal.js"
import Product from "./modals/productModal.js"
import Order from "./modals/orderModal.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importData = async () => {
    try {
     await   Order.deleteMany()
     await   Product.deleteMany()
     await   User.deleteMany()
     
    const createdUser= await User.insertMany(users)
    const adminUser=createdUser[0]._id //first item of users.js is admin
    
    const sampleProducts = products.map(product => {
        return {...product,user:adminUser}
    })
        await Product.insertMany(sampleProducts)
       // console.log("data imported".green.inverse)
        process.exit(1)
    } catch (error)
    {
       // console.log("error", error.red.inverse)
        process.exit(1)
    }
}

const destoryData = async () => {
    try {
     await   Order.deleteMany()
     await   Product.deleteMany()
     await    User.deleteMany()
     
   
       // console.log("data destoryed".red.inverse)
        process.exit(1)
    } catch (error)
    {
       // console.log("error", error.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') //node in index 0, backend/seeder is index 1 and -d is index 2 in terminal
{
    destoryData()
} else {
    importData()
}