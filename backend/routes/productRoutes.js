import express from "express";
import dotenv from "dotenv";
import {getProducts,getFilterProducts,getProductById,deleteProduct,updateProduct,createProduct,createProductReview} from "../controlers/productController.js"
import { protect,admin } from "../middleware/authMiddleware.js"
const router = express.Router();


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/').get(getFilterProducts)
router.route('/:id/reviews').post(protect,createProductReview)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
//router.get('/:id',getProductById())

export default router;