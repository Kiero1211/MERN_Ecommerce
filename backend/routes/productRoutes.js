import { Router } from "express";
import formidable from "express-formidable";

import { authorize, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { checkId } from "../middlewares/checkId.js";

import { 
    fetchProducts,
    fetchAllProducts,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = Router();

router.route("/").get(authorize, authorizeAdmin, fetchProducts);
router.route("/all").get(authorize, authorizeAdmin, fetchAllProducts);
router.route("/create").post(authorize, authorizeAdmin, formidable(), createProduct);
router.route("/:id")
    .get(authorize, authorizeAdmin, readProduct)
    .put(authorize, authorizeAdmin, formidable(), updateProduct)
    .delete(authorize, authorizeAdmin, deleteProduct);


export default router;