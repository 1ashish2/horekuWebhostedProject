import Order from "../modals/orderModal.js"
import asyncHandler from "express-async-handler"


//@description  create new order
//@route  post /api/orders
//@acess  private
const addOrderItems = asyncHandler(async(req,res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createOrder = await order.save() //for save to database
        
        res.status(201).json(createOrder)
    }
})

//@description  get order by id
//@route  get /api/orders/:id
//@acess  private
const getOrderById = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')// user associate with order so we use populate()->user with name and email
    
    if (order)
    {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
        }

})


//@description  update order to paid
//@route  get /api/orders/:id/pay
//@acess  private
const updateOrderToPaid = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id)
    
    if (order)
    { //after order is paid then adding data in order to update database
        order.isPaid = true 
        order.paidAt = Date.now()
        order.paymentResult = { //these are added from paypal
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder= await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
        }

})


//@description  update order to delivered
//@route  get /api/orders/:id/deliver
//@acess  private/admin
const updateOrderToDelivered = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id)
    
    if (order)
    { //after order is paid then adding data in order to update database
        order.isDelivered = true 
        order.deliveredAt = Date.now()
        
        const updatedOrder= await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
        }

})



//@description  get logedin user orders
//@route  get /api/orders/myorders
//@acess  private
const getMyorders = asyncHandler(async(req,res) => {
    const orders = await Order.find({ user: req.user._id }) //find only loged in user order and order shold be more than 1
    res.json(orders)
    
})

//@description  get all orders
//@route  get /api/orders/
//@acess  private/admin
const getOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({}).populate('user','id name') //find oall order and order and user(name,id) associated with it
    res.json(orders)
    
})
export {addOrderItems,getOrderById,updateOrderToPaid, getMyorders,getOrders,updateOrderToDelivered}