import Order from "../models/Order.js";
import Product from "../models/Product.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import calculateOrderPrice from "../utils/calculateOrderPrice.js";

// ----------- GET -------------
/*
    GET /api/orders/all
*/
const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const allOrders = await Order.find().populate("user", "id username");
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

/*
    GET /api/order/current
*/
const getCurrentOrder = asyncHandler(async (req, res) => {
    try {
        const currentUserOrders = await Order.find({user: req.user._id});

        res.status(200).json(currentUserOrders);
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

/*
    GET /api/order/all/count
*/
const getTotalNumberOrders = asyncHandler(async (req, res) => {
    try {
        const totalCount = await Order.find().countDocuments();

        res.status(200).json({totalCount});
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

/*
    GET /api/orders/all/sales
*/
const getTotalSalesOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        res.status(200).json({totalSales});
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})



/*
    GET /api/orders/all/sales-by-date
*/
const getTotalSalesByDateOrders = asyncHandler(async (req, res) => {
    try {
        const salesByDate = await Order.aggregate([
            {
                $match: {
                    isPaid: true
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {format: "%d-%m-%Y", date: "$paidAt"}
                    },
                    totalSales: {$sum: "$totalPrice"}
                }
            }
        ])

        res.status(200).json(salesByDate);
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

/*
    GET /api/orders/:id
*/
const getOrderById = asyncHandler(async (req, res) => {
    try {
        const orderId = req.params.id;
        const requestedOrder = await Order.findById(orderId);

        if (!requestedOrder) {
            res.status(404).json({message: "Cannot find order"});
        }
        res.status(200).json(requestedOrder);
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

// ----------- POST ------------
/*
    POST /api/orders/create
*/
const createOrder = asyncHandler(async (req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod} = req.body;

        if (!orderItems || orderItems.length === 0) {
            res.status(400)
            throw new Error("No order items");
        }

        const allItems = await Product.find();
        // Iterate through the order array and construct new order array
        let resultItems = [];
        orderItems.forEach(async (item) => {
            const matchingItemFromDB = allItems.find(dbItem => dbItem._id.toString() === item._id.toString());

            if (!matchingItemFromDB) {
                res.status(404);
                throw new Error("Item not found");
            }

            resultItems.push({
                ...item,
                product: item._id,
                price: matchingItemFromDB.price,
                _id: undefined
            })
        })
        const {itemsPrice, shippingPrice, taxPrice, totalPrice} = calculateOrderPrice(resultItems)
        const order = new Order({
            user: req.user._id,
            orderItems: resultItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        await order.save();
        res.status(200).json(order);

    } catch (error) {
        res.json({message: error.message});
    }
});

// ---------- PUT ------------
/*
    PUT /api/orders/:id/pay
*/
const markOrderAsPaid = asyncHandler(async (req, res) => {
    try {
        const orderId = req.params.id;
        const requestedOrder = await Order.findById(orderId);
    
        if (!requestedOrder) {
            res.status(404)
            throw new Error("Cannot find order");
        }

        requestedOrder.isPaid = true;
        requestedOrder.paidAt = Date.now();
        requestedOrder.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email: req.body.payer.email
        }

        const updatedOrder = await requestedOrder.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

/*
    PUT /api/orders/:id/deliver
*/
const markOrderAsDelivered = asyncHandler(async (req, res) => {
    try {
        const orderId = req.params.id;
        const requestedOrder = await Order.findById(orderId);
    
        if (!requestedOrder) {
            res.status(404)
            throw new Error("Cannot find order");
        }

        requestedOrder.isDelivered = true;
        requestedOrder.deliveredAt = Date.now();

        const updatedOrder = await requestedOrder.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


export {
    getAllOrders,
    getCurrentOrder,
    getTotalNumberOrders,
    getTotalSalesOrders,
    getTotalSalesByDateOrders,
    getOrderById,
    createOrder,
    markOrderAsPaid,
    markOrderAsDelivered
}
