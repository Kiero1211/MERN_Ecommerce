import { Router } from "express";
import formidable from "express-formidable";

import { authorize, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { checkId } from "../middlewares/checkId.js";

import { 
    createProduct

} from "../controllers/productController.js";

const router = Router();

router.route("/create").post(authorize, authorizeAdmin, formidable(), createProduct);


export default router;