import User from "../modals/userModal.js"
import asyncHandler from "express-async-handler"
import generateToken from '../utils/generateToken.js'

//@description  auth the user & get token
//@route  POST /api/users/login
//@acess  public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body // parsing email and password in json by using express.json() in server.js
    // res.send({
    //     email,
    //     password,
    // })

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


//@description  REGISTER user profile
//@route  post /api/users
//@acess  PUBLIC
const registerUser =  asyncHandler(async (req, res) => {
    const {name, email, password } = req.body // parsing email and password in json by using express.json() in server.js
    
    const userExists = await User.findOne({ email });
   console.log(email)
    if (userExists)
    {
        res.status(400)
        throw new Error('User already exists')
    } 
    const user = await User.create({
        name,
        email,
        password,
    })
    if (user)
    {
         
        res.status(201).json({
              _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})


//@description  get user profile
//@route  GET /api/users/profile
//@acess  private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin, 
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


//@description  update user profile
//@route  put /api/users/profile
//@acess  private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password)
        {
             user.password=req.body.password 
         } 
        const updateUser = await user.save()
         res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
             isAdmin: updateUser.isAdmin,
             token:generateToken(updateUser._id),
        })
        
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


//@description  get all user profile
//@route  GET /api/users
//@acess  private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})//passing empty object to get all user
    
    res.json(users)
})

//@description  delete user profile
//@route  DELETE /api/users
//@acess  private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)//passing empty object to get all user
    
    if (user)
    {
        await user.remove()
        res.json({message:"User removed"})
    } else {
        res.status(404)
        throw new Error('User not found')
        }
    res.json(user)
})


//@description  get user by id
//@route  GET /api/users
//@acess  private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await  User.findById(req.params.id).select('-password')
    
    if (user)
    {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
        }
   
})


//@description  update user
//@route  put /api/users/:id
//@acess  private/Admin
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin=req.body.isAdmin  
        const updateUser = await user.save()
         res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            
        })
        
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { authUser,getUserProfile,registerUser,updateUserProfile,getUsers,deleteUsers,updateUser,getUserById}