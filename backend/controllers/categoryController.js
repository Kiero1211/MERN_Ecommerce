import Category from "../models/Category.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/*
    POST /api/category/
*/
const createCategory = asyncHandler(async(req, res) => {
    try {
        const {name} = req.body;
        if (!name.trim()) {
            return res.status(500).json({error: "Name is required"});
        }

        const existingCategory = await Category.findOne({name});

        if (existingCategory) {
            return res.status(500).json({error: "Category already existed"});
        }

        const newCategory = await new Category({name}).save();
        return res.status(200).json(newCategory);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json(error);
    }
})

export {createCategory}
