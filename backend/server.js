import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import path from "path"
import morgan from 'morgan' //for getting hit url and reviews purpose
import colors from "colors" //show the console in different color
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import uploadRoutes from "./routes/uploadRoutes.js"
    dotenv.config()
    connectDB()
    const app = express(); //initialize
    
if (process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev')) //after hit the url we will get the url in console ex- GET /api/products 200 754.269 ms - 1910
}

    app.use(express.json()) //allow to accept json data ex- auth with email and password
    

    app.use('/api/products', productRoutes)
    app.use('/api/users', userRoutes)
    app.use('/api/orders', orderRoutes)
    app.use('/api/upload', uploadRoutes)

    app.use('/api/config/paypal', (req, res) => {
        res.send(process.env.PAYPAL_CLIENT_ID)
    })
  const __dirname=path.resolve() //need current directory so we need resolve because we r using es6 not require to import
    app.use('/uploads',express.static(path.join(__dirname,'/uploads')))//making upload folder static(pointing that folder) because without it not accessable

    if (process.env.NODE_ENV === 'production')
    {
        app.use(express.static(path.join(__dirname,'/ecommerce/build'))) //we need to make static build folder to run backend and frontend
        app.get('*', (req, res) => //if any routes is not an api then putting callback function and make default file call as in build folder index.html
           res.sendFile(path.resolve(__dirname,'ecommerce','build','index.html')) //path of file
       ) //for run all routing in production mode
    } else {
        app.get('/', (req, res) => {
        res.send('api is running')
    })
    }
    
    app.use(notFound) //for 404
    app.use(errorHandler) //for 500

    const PORT=process.env.PORT || 5000 //env --> use for securing sensitive information
    app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))