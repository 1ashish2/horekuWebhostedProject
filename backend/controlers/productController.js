import Product from "../modals/productModal.js"
import asyncHandler from "express-async-handler"


//@description  fetch all products
//@route  GET /api/products 
//@acess  public
const getProducts = asyncHandler(async (req, res) => {
      const products = await Product.find({})
    // res.status(401)
    // throw new Error('Not Authorized')
    res.json(products)
})


const getFilterProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page =Number(req.query.pageNumber) || 1
    // const keyword = req.query.keyword?{  
    //     name: {
    //         $regex: req.query.keyword, //we might be not put full name to search to access all type of input we use $regex
    //         $options:'i' //we r using 'i' for case insensitive
    //     }
    // } : {}
   
    const keyword = req.query.keyword?{  
        category: {
            $regex: req.query.keyword, //we might be not put full name to search to access all type of input we use $regex
            $options:'i' //we r using 'i' for case insensitive
        }
    } : {}
    const count = await Product.countDocuments({...keyword}) //count of product count or countDocument we can use
     const productslist = await Product.find({...keyword}).limit(pageSize).skip(pageSize *(page - 1)) //it will gives all product list and limiting the product for pagination and have to skip intial pazeSize when its comes
    // res.status(401)
    // throw new Error('Not Authorized')
    res.json({productslist,page,pages:Math.ceil(count / pageSize)})
})

//@description  fetch single products
//@route  GET /api/products
//@acess  public
const getProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if (product)
    {
          res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
  
})

// @description  delete product
//@route  DELETE /api/products
//@acess  public/admin
const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if (product)
    {
        //  req.user._id === product.user._id // user which create the product that only be deleted by particular admin
        await product.remove()
        res.json({message:'product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
  
})


// @description  create a product
//@route  post /api/products
//@acess  public/admin
const createProduct = asyncHandler(async(req,res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        subcategory:"Sample sub category",
        countInStock: 0,
        numReviews: 0,
        description:'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  
})


// @description  update a product
//@route  put /api/products/:id
//@acess  private/admin
const updateProduct = asyncHandler(async(req,res) => {
    const { name, price, description, image, brand, category,subcategory, countInStock } = req.body
    
    const product = await Product.findById(req.params.id)
    if (product)
    {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.subcategory= subcategory
        product.countInStock = countInStock
        
        const updatedProduct = await product.save()
        res.json(updatedProduct)
  
    } else {
        res.status(404)
        throw new Error('Product not found')
        }
    
})


// @description  create new review
//@route  post /api/products/:id/reviews
//@acess  private
const createProductReview = asyncHandler(async(req,res) => {
    const { rating,comment} = req.body
    
    const product = await Product.findById(req.params.id)
    if (product)
    {
      // if product reviewd create variable
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        
        if (alreadyReviewed)
        {
            res.status(400)
            throw new Error('Product already reviewed ')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user:req.user._id
        }
      
        product.reviews.push(review)

        product.numReviews = product.reviews.length
        
        product.rating = product.reviews.reduce((acc, item) =>  item.rating +acc ,0 )/product.reviews.length //for overall reviews
           
        await product.save()
        
        res.status(201).json({
            message:'Reviewd added'
        })

    } else {
        res.status(404)
        throw new Error('Product not found')
        }
    
})

export { getProducts,getFilterProducts, getProductById,deleteProduct,updateProduct,createProduct,createProductReview}
