import { Router } from "express";
const router = Router();

import { authorize, authorizeAdmin } from "../middlewares/authMiddleware.js";

import { 
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    readCategory
} from "../controllers/categoryController.js";

// Admin routes
router.route("/").get(getAllCategories);
router.route("/create").post(authorize, authorizeAdmin, createCategory);
router.route("/:categoryId")
    .get(readCategory)
    .put(authorize, authorizeAdmin, updateCategory)
    .delete(authorize, authorizeAdmin, deleteCategory);
export default router;