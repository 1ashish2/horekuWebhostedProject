import express from "express";
import dotenv from "dotenv";
const router = express.Router();
import {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,deleteUsers,updateUser,getUserById} from "../controlers/userController.js"
import { protect,admin } from "../middleware/authMiddleware.js"

router.route('/').post(registerUser).get(protect,admin,getUsers) //admin can get all data of user
router.post('/login',authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect,deleteUsers).get(protect,getUserById).put(protect,updateUser)

export default router; 