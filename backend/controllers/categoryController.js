import Category from "../models/Category.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/*
    GET /api/category/categories
*/
const getAllCategories = asyncHandler(async(req, res) => {
    const categories = await Category.find({});
    return res.status(200).json(categories);
})

/*
    GET /api/category/:categoryId
*/
const readCategory = asyncHandler(async(req, res) => {
    const categoryId = req.params.categoryId;
    const requestedCategory = await Category.findById(categoryId);

    if (!requestedCategory) {
        return res.status(404).json({message: "Category not found"});
    }

    return res.status(200).json(requestedCategory);
})

/*
    POST /api/category/
*/
const createCategory = asyncHandler(async(req, res) => {
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
})

/*
    PUT /api/category/:categoryId
*/
const updateCategory = asyncHandler(async(req, res) => {
    const {name} = req.body;
    const categoryId = req.params.categoryId;
    
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
        return res.status(404).json({message: "Cannot find category"});
    }
    await existingCategory.updateOne({name});
    return res.status(200).json({message: "Updated successfully"});
});


/*
    DELETE /api/category/:categoryId
*/
const deleteCategory = asyncHandler(async(req, res) => {
    const categoryId = req.params.categoryId;
    
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
        return res.status(404).json({message: "Cannot find category"});
    }
    await existingCategory.deleteOne();
    return res.status(200).json({message: "Deleted successfully"});
}); 

export {
    createCategory, 
    updateCategory,
    deleteCategory,
    getAllCategories,
    readCategory
};
