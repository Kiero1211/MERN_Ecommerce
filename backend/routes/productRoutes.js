import { Router } from "express";
import formidable from "express-formidable";
import uploadRoutes from "./uploadRoutes.js";

import { authorize, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { checkId } from "../middlewares/checkId.js";

import {
    fetchProducts,
    fetchAllProducts,
    fetchTopProducts,
    fetchNewProducts,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    filterProducts,
    createProductReview
} from "../controllers/productController.js";

const router = Router();

// Product routes
router.route("/").get(fetchProducts);

router.route("/all").get(fetchAllProducts);

router.route("/create").post(authorize, formidable(), createProduct);

router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);

router.route("/filter").post(filterProducts);

router.route("/:id")
    .get(checkId, readProduct)
    .put(authorize, authorizeAdmin, checkId, formidable(), updateProduct)
    .delete(authorize, authorizeAdmin, checkId, deleteProduct);


// Review routes
router.route("/:id/reviews/create").post(authorize, checkId, createProductReview);


export default router;