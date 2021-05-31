import jwt from "jsonwebtoken"
import expressAsyncHandler from "express-async-handler"
import User from "../modals/userModal.js"

const protect = expressAsyncHandler(async (req,res,next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await  User.findById(decode.id).select('-password') //it will show all except password
            //console.log(req.user)
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error ('Not authroized,token failed')
        }
    }

    if (!token)
    {
        res.status(401)
        throw new Error('Not authorized, no token')
        }
  
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) //check the user is exist or not and isAdmin or not if its admin then move on and get the all user data
    {
        next()
    } else
    { 
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
    
}
export { protect,admin }