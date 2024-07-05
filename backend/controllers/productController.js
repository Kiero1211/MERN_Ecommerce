import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/Product.js";

// ------- GET ---------
/*
    GET /api/products/all
*/
const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 12;
        const products = await Product
            .find({})
            .populate("category")
            .sort({ createdAt: -1 })
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
            ? { name: { $regex: req.query.keyword, $options: "i" } }
            : {};

        const count = await Product.countDocuments({ ...keyword });
        const products = await Product
            .find({ ...keyword })
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
    GET /api/products/top
*/
const fetchTopProducts = asyncHandler(async (req, res) => {
    try {
        const limitNumber = 4;
        const products = await Product
            .find()
            .sort({ createdAt: -1, rating: -1 })
            .limit(limitNumber)

        return res.status(200).json(products);
    } catch (error) {
        throw new Error(error.message);
    }
})

/*
    GET /api/products/top
*/
const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
        const limitNumber = 5;
        const products = await Product
            .find()
            .sort({ createdAt: -1 })
            .limit(limitNumber)

        return res.status(200).json(products);
    } catch (error) {
        throw new Error(error.message);
    }
})


// ------- POST ---------
/*
    POST /api/products/create
*/
const createProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, stock, category, quantity, brand } = req.fields;
        // Server-side validation
        switch (true) {
            case !name:
                throw new Error("Name is required");
            case !description:
                throw new Error("Description is required");
            case !price:
                throw new Error("Price is required");
            case !stock:
                throw new Error("Stock is required");
            case !category:
                throw new Error("Category is required");
            case !quantity:
                throw new Error("Quantiy is required");
            case !brand:
                throw new Error("Brand is required");
            default:
        }

        const newProduct = new Product({
            ...req.fields,
            price: Number(price),
            quantity: Number(quantity),
            stock: Number(stock)
        });
        await newProduct.save();
        return res.json(newProduct);
    } catch (error) {
        throw new Error(error.message);
    }
});

/*
    POST /api/products/:id/reviews/create
*/
const createProductReview = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        const isAlreadyReviewed = product.reviews.find(review => {
            return review.user.toString() === req.user._id.toString();
        })

        if (isAlreadyReviewed) {
            res.status(400);
            throw new Error("A user can review only once");
        }

        const newReview = {
            name: req.user.username,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        // Update product's properties
        product.reviews.push(newReview);
        product.numReviews = product.reviews.length;
        // Round to the 2nd digit
        product.rating = Math.round((product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.numReviews) * 100) / 100;
        await product.save();

        return res.status(200).json({ message: "Review added sucessfully" });
    } catch (error) {
        throw new Error(error.message);
    }
});

const filterProducts = asyncHandler(async (req, res) => {
    try {
        const {checked, radios} = req.body;

        const filterObject = {}

        if (checked.length > 0) {
            filterObject.category = {$in: checked}
        }

        if (radios.length > 0) {
            filterObject.price = {$gte: radios[0], $lte: radios[1]}
        }

        const products = await Product.find(filterObject);
        res.status(200).json(products);

    } catch (error) {
        console.error(error);
    }
})


// ------- PUT ---------
/*
    PUT /api/products/:id
*/
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const requestedProductId = req.params.id;
        const { name, description, price, stock, category, quantity, brand } = req.fields;
        // Server-side validation
        switch (true) {
            case !name:
                throw new Error("Name is required");
            case !description:
                throw new Error("Description is required");
            case !price:
                throw new Error("Price is required");
            case !stock:
                throw new Error("Stock is required");
            case !category:
                throw new Error("Category is required");
            case !quantity:
                throw new Error("Quantiy is required");
            case !brand:
                throw new Error("Brand is required");
            default:
        }

        const newProduct = await Product.findByIdAndUpdate(
            requestedProductId,
            {
                ...req.fields,
                price: Number(price),
                quantity: Number(quantity),
                stock: Number(stock)
            },
            { new: true }
        )
        await newProduct.save();
        return res.json(newProduct);
    } catch (error) {
        throw new Error(error.message);
    }
})


// ------- DELETE ---------
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
    // Products
    fetchProducts,
    fetchAllProducts,
    fetchTopProducts,
    fetchNewProducts,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    filterProducts,
    // Reviews
    createProductReview,

}