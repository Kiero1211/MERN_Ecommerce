import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/Product.js";

const createProduct = asyncHandler(async(req, res) => {
    res.send("In createProduct");
});

export {
    createProduct
}