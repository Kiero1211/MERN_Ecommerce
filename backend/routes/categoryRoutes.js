import { Router } from "express";
const router = Router();

import { authorize, authorizeAdmin } from "../middlewares/authMiddleware.js";

import { 
    createCategory,
    updateCategory 
} from "../controllers/categoryController.js";

// Admin routes
router.route("/").post(authorize, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authorize, authorizeAdmin, updateCategory);
export default router;