import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/Product.js";


/*
    GET /api/products/all
*/
const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 12;
        const products = await Product
            .find({})
            .populate("category")
            .sort({createdAt: -1})
            .limit(pageSize);
        const count = await Product.countDocuments();

        return res.status(200).json({
            products,
            page: 1,
            pages: Number(Math.ceil(count / pageSize)),
            hasMore: false
        });
    } catch (error) {
        throw new Error(error.message);
    }
})

/*
    GET /api/products/
*/
const fetchProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword 
            ? {name: {$regex: req.query.keyword, $options: "i"}}
            : {};

        const count = await Product.countDocuments({...keyword});
        const products = await Product
            .find({...keyword})
            .populate("category")
            .limit(pageSize);
        
        return res.status(200).json({
            products,
            page: 1,
            pages: Number(Math.ceil(count / pageSize)),
            hasMore: false
        });
    } catch (error) {
        throw new Error(error.message);
    }
})

/*
    GET /api/products/:id
*/
const readProduct = asyncHandler(async (req, res) => {
    try {
        const requestedProductId = req.params.id;
        const requestedProduct = await Product.findById(requestedProductId);
        if (!requestedProduct) {
            return res.status(404).json({ message: "Cannot find product" })
        }

        return res.status(200).json(requestedProduct);
    } catch (error) {
        throw new Error(error.message);
    }
})


/*
    POST /api/products/create
*/
const createProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields;
        // Server-side validation
        switch (true) {
            case !name:
                throw new Error("Name is required");
            case !description:
                throw new Error("Description is required");
            case !price:
                throw new Error("Price is required");
            case !category:
                throw new Error("Category is required");
            case !quantity:
                throw new Error("Quantiy is required");
            case !brand:
                throw new Error("Brand is required");
            default:
        }

        const newProduct = new Product({ ...req.fields });
        await newProduct.save();
        return res.json(newProduct);
    } catch (error) {
        throw new Error(error.message);
    }
});

/*
    PUT /api/products/:id
*/
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const requestedProductId = req.params.id;
        const { name, description, price, category, quantity, brand } = req.fields;
        // Server-side validation
        switch (true) {
            case !name:
                throw new Error("Name is required");
            case !description:
                throw new Error("Description is required");
            case !price:
                throw new Error("Price is required");
            case !category:
                throw new Error("Category is required");
            case !quantity:
                throw new Error("Quantiy is required");
            case !brand:
                throw new Error("Brand is required");
            default:
        }

        const newProduct = await Product.findByIdAndUpdate(
            { _id: requestedProductId },
            { ...req.fields },
            { new: true }
        )
        await newProduct.save();
        return res.json(newProduct);
    } catch (error) {
        throw new Error(error.message);
    }
})

/*
    DELETE /api/products/:id
*/
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const requestedProductId = req.params.id;
        const requestedProduct = await Product.findById(requestedProductId);
        if (!requestedProduct) {
            return res.status(404).json({ message: "Cannot find product" });
        }
        await Product.findByIdAndDelete(requestedProductId);

        return res.status(200).json(requestedProduct);
    } catch (error) {
        throw new Error(error.message);
    }
})

export {
    fetchProducts,
    fetchAllProducts,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct
}